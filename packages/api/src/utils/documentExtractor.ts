import * as pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { ORPCError } from "@orpc/server";

export type SupportedFileType = "application/pdf" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export interface ExtractedText {
	text: string;
	metadata?: {
		pages?: number;
		wordCount?: number;
	};
}

export async function extractTextFromFile(
	fileBuffer: Buffer,
	mimeType: string,
): Promise<ExtractedText> {
	try {
		if (mimeType === "application/pdf") {
			return await extractFromPDF(fileBuffer);
		} else if (
			mimeType ===
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
		) {
			return await extractFromDOCX(fileBuffer);
		} else {
			throw new ORPCError("BAD_REQUEST", {
				message: `Tipo de arquivo não suportado: ${mimeType}. Apenas PDF e DOCX são aceitos.`,
			});
		}
	} catch (error) {
		if (error instanceof ORPCError) {
			throw error;
		}
		throw new ORPCError("INTERNAL_SERVER_ERROR", {
			message: `Erro ao extrair texto do arquivo: ${
				error instanceof Error ? error.message : "Erro desconhecido"
			}`,
		});
	}
}

async function extractFromPDF(buffer: Buffer): Promise<ExtractedText> {
	const parser = new pdfParse.PDFParse({ data: buffer });
	const textResult = await parser.getText();
	await parser.destroy();
	return {
		text: textResult.text.trim(),
		metadata: {
			pages: textResult.total,
			wordCount: textResult.text.split(/\s+/).length,
		},
	};
}

async function extractFromDOCX(buffer: Buffer): Promise<ExtractedText> {
	const result = await mammoth.extractRawText({ buffer });
	const text = result.value.trim();
	return {
		text,
		metadata: {
			wordCount: text.split(/\s+/).length,
		},
	};
}

export function validateFileType(mimeType: string): boolean {
	const supportedTypes: SupportedFileType[] = [
		"application/pdf",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	];
	return supportedTypes.includes(mimeType as SupportedFileType);
}

export function validateFileSize(size: number, maxSizeMB = 10): boolean {
	const maxSizeBytes = maxSizeMB * 1024 * 1024;
	return size <= maxSizeBytes;
}