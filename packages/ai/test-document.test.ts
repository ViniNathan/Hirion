import { config } from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";

// Carrega o .env de apps/server/
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");
const envPath = resolve(__dirname, "../../apps/server/.env");
config({ path: envPath });

import { agentCall } from "./index";

// Exemplo de currículo para teste
const exemploCurriculo = `
Lucas Andrade Ribeiro

São Paulo, Brasil
📧 lucas.andrade.dev@email.com

📞 +55 (11) 91234-5678
🔗 linkedin.com/in/lucasandribeiro-dev
💻 github.com/lucas-andrade-dev

Resumo Profissional

Desenvolvedor Full Stack com aproximadamente 3 anos de experiência atuando em ambientes corporativos e startups, tanto como CLT quanto como freelancer. Especialista no desenvolvimento de aplicações web modernas, escaláveis e de alta performance, com forte atuação em backend Node.js e frontend React/Next.js.
Possui domínio de bancos de dados SQL e NoSQL, arquitetura de APIs REST e GraphQL, testes automatizados e práticas modernas de DevOps. Foco constante em qualidade de código, usabilidade, escalabilidade e entrega de valor real ao negócio.

Experiência Profissional
Desenvolvedor Full Stack

PayFlow Solutions – Brasil
Fintech especializada em meios de pagamento e soluções financeiras
Agosto 2024 – Presente

Atuação direta na modernização de um sistema legado de processamento de pagamentos que apresentava gargalos de performance e alto custo de manutenção.

Liderança técnica na reescrita completa da aplicação, abrangendo backend e frontend.

Backend reconstruído com Node.js, NestJS e Prisma, adotando arquitetura modular e boas práticas de segurança.

Implementação de testes end-to-end com Jest e containerização completa com Docker.

Coordenação da reconstrução do frontend utilizando Next.js, TypeScript, TailwindCSS, Zod e Zustand.

Deploy e monitoramento na AWS, resultando em aumento significativo de performance, redução de falhas e melhor observabilidade do sistema.

Tecnologias: TypeScript, Node.js, NestJS, Prisma, Next.js, TailwindCSS, AWS, Docker, Git, REST API, Scrum, Jira.

Desenvolvedor Full Stack

OptiLab – Brasil
Startup focada em plataformas de experimentação e testes A/B
Janeiro 2024 – Julho 2024

Responsável por definir e implementar a arquitetura backend de um novo produto voltado para testes A/B e pesquisas digitais.

Desenvolvimento completo do dashboard administrativo e componentes injetáveis utilizados nos experimentos.

Backend desenvolvido com Node.js, Fastify e GraphQL, garantindo escalabilidade e organização do domínio.

Criação de testes automatizados com Jest para validação dos fluxos críticos.

Frontend desenvolvido com React, TailwindCSS e Zustand, incluindo dashboards, fluxos de criação de experimentos e modais injetáveis via DOM.

Entrega do MVP que possibilitou validação com clientes reais e início da tração do produto.

Tecnologias: TypeScript, Node.js, Fastify, GraphQL, React, TailwindCSS, Zustand, Git, GitHub.

Desenvolvedor Full Stack – Estágio

Stratix Consulting – Brasil
Consultoria de estratégia e tecnologia
Março 2023 – Dezembro 2023

Participação em projetos de modernização de sistemas internos e automação de fluxos de atendimento digital.

Desenvolvimento de uma plataforma web de curadoria de conteúdo utilizando React e Node.js.

Reestruturação de um chatbot corporativo, migrando de fluxos estáticos para uma solução dinâmica baseada em IA.

Implementação de um pipeline de RAG (Retrieval-Augmented Generation) utilizando LangChain e vector database, permitindo respostas mais contextuais e atualizadas.

Integração do chatbot com Slack e WhatsApp, aumentando significativamente a adoção interna da ferramenta.

Tecnologias: TypeScript, React, Node.js, Express, LangChain, Vector Databases, Git, REST API, Scrum.
`;

// Exemplo de descrição de vaga para teste
const exemploVaga = `
SOBRE A CAPCO 

A Capco é uma consultoria global de tecnologia e negócios, focada no setor de serviços financeiros e energia, somos apaixonados por ajudar nossos clientes, temos 33 escritórios nas Américas, Europa e Ásia-Pacífico! Se criatividade e inovação são sua paixão, a Capco é ideal para você. Vamos te apoiar e ajudar a acelerar sua carreira!

Estamos à procura de um(a) desenvolvedor(a) altamente habilidoso e apaixonado por tecnologia para integrar nossa equipe de desenvolvimento. Como desenvolvedor(a) Full Stack, você desempenhará um papel fundamental na criação e manutenção de sistemas robustos, escaláveis e eficientes que suportam nossos processos de ETL (Extract, Transform, Load) e integração de dados. Você trabalhará com tecnologias modernas, incluindo (Java e React.js), NoSQL (MongoDB), arquitetura baseada em eventos e ferramentas de observabilidade para garantir que nosso sistema seja altamente observável e fácil de depurar.

Principais Responsabilidades

Desenvolver e manter serviços e APIs back end e front end que suportem os processos de ETL e integração de dados (Java e React.js);
Implementar soluções de armazenamento de dados NoSQL, como MongoDB, para armazenar e consultar dados de forma eficaz;
Projetar e implementar sistemas de integração baseados em eventos para facilitar a comunicação entre os diferentes componentes do sistema;
Trabalhar com protocolos FTP e lidar com arquivos posicionais para a troca de dados com parceiros externos;
Garantir que o sistema de ETL seja altamente observável, permitindo a fácil depuração de problemas e a monitoração de desempenho;
Colaborar com equipes multidisciplinares para entender requisitos e garantir que as soluções desenvolvidas atendam às necessidades de negócios;
Realizar testes de unidade, integração e aceitação para garantir a qualidade do código;
Manter a documentação técnica atualizada e participar na revisão de código;
Ficar atualizado com as melhores práticas e tendências em desenvolvimento back end e front end.

Requisitos Técnicos

Experiência comprovada em desenvolvimento back-end e front end, em um ambiente de microserviços com Linguagem Java, Spring Boot, React.js;
Conhecimento sólido em NoSQL, com experiência prática em MongoDB;
Experiência em desenvolvimento de sistemas ETL;
Experiência com Cloud (AWS, AZURE);
Familiaridade com arquitetura baseada em eventos e ferramentas relacionadas;
Conhecimento em protocolos FTP e manipulação de arquivos posicionais;
Habilidade de escrever código limpo, escalável e de fácil manutenção;
Graduação em Ciência da Computação, Engenharia de Software ou área relacionada;
Inglês avançado (atuará em time internacional).

Por Que Capco

Na Capco promovemos uma cultura inclusiva. Valorizamos a diversidade em todas as suas expressões.

Pensamos, em conjunto, sempre em ações diversas de inclusão e de responsabilidade social através de comitês internos geridos pela nossa comunidade interna, como os grupo de Mulheres, Pessoas Com Deficiência, Pessoas Negras, LGBTQIAPN+, Parentalidade, Gerações, entre outros.

Nossas oportunidades são trabalhadas para todos(as)!
`;

describe("Teste de processamento de documento pela IA", () => {
	test("deve processar um currículo válido", async () => {
		const resultado = await agentCall(exemploCurriculo, exemploVaga);

		console.log("Resultado do processamento:");
		console.log(JSON.stringify(resultado, null, 2));

		expect(resultado).toBeDefined();
	}, 50000); // timeout de 50 segundos para chamadas de IA
});
