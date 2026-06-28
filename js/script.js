// Função global de fallback para a imagem de perfil
        function handleImageError() {
            const img = document.getElementById('profile-img');
            const fallback = document.getElementById('profile-fallback');
            if (img && fallback) {
                img.style.display = 'none';
                fallback.style.display = 'flex';
            }
        }

        // Helpers de Sugestão IA fora do escopo estrito se necessário
        function setAiPrompt(text) {
            const input = document.getElementById('ai-prompt-input');
            if (input) {
                input.value = text;
                input.focus();
            }
        }

        function clearAiSession() {
            const container = document.getElementById('ai-response-container');
            const placeholder = document.getElementById('ai-placeholder');
            const textEl = document.getElementById('ai-response-text');
            const input = document.getElementById('ai-prompt-input');
            
            if (container && placeholder && textEl && input) {
                container.classList.add('d-none');
                placeholder.classList.remove('d-none');
                textEl.innerHTML = '';
                input.value = '';
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            
            // --- Projects Data & Filtering ---
            const projects = [
                {
                    id: 1,
                    title: "Microserviços Financeiros",
                    category: "software",
                    desc: "Arquitetura de microserviços em Node.js e Spring Boot para processamento de pagamentos em tempo real.",
                    tech: ["Node.js", "Java", "RabbitMQ", "Docker"],
                    icon: "ph-code"
                },
                {
                    id: 2,
                    title: "Pipeline ETL Escalonável",
                    category: "dados",
                    desc: "Construção de Datalake na AWS e pipelines ETL com Apache Spark lidando com terabytes de dados diários.",
                    tech: ["Python", "Spark", "AWS S3", "Airflow"],
                    icon: "ph-database"
                },
                {
                    id: 3,
                    title: "Bot de Triagem Fiscal",
                    category: "automacao",
                    desc: "Automação RPA que lê PDFs fiscais, extrai dados e insere no ERP da empresa reduzindo 90% do tempo manual.",
                    tech: ["UiPath", "Python", "Regex", "OCR"],
                    icon: "ph-robot"
                },
                {
                    id: 4,
                    title: "Sistema de Gestão SaaS",
                    category: "software",
                    desc: "Desenvolvimento Fullstack de um sistema multitenant para clínicas, focado em alta disponibilidade.",
                    tech: ["React", "PostgreSQL", "Express", "Redis"],
                    icon: "ph-browser"
                },
                {
                    id: 5,
                    title: "Dashboard Preditivo",
                    category: "dados",
                    desc: "Análise de churn de clientes com modelos de Machine Learning apresentados num dashboard interativo.",
                    tech: ["Pandas", "Scikit-Learn", "Metabase", "SQL"],
                    icon: "ph-chart-line-up"
                },
                {
                    id: 6,
                    title: "Web Scraper Jurídico",
                    category: "automacao",
                    desc: "Script de automação para raspagem de diários oficiais e envio de alertas diários para advogados.",
                    tech: ["Selenium", "BeautifulSoup", "Cron", "Telegram API"],
                    icon: "ph-magnifying-glass"
                }
            ];

            const grid = document.getElementById('projects-grid');
            const filterBtns = document.querySelectorAll('.filter-btn');

            // Render function
            function renderProjects(filterValue) {
                // Clear grid
                grid.innerHTML = '';
                
                // Filter array
                const filtered = filterValue === 'all' 
                    ? projects 
                    : projects.filter(p => p.category === filterValue);

                // Build HTML
                filtered.forEach((p, index) => {
                    const col = document.createElement('div');
                    col.className = 'col animate-slide-up';
                    col.style.animationDelay = `${index * 0.1}s`;
                    col.style.animationFillMode = 'forwards';
                    
                    const techSpans = p.tech.map(t => `<span class="badge bg-white bg-opacity-10 text-white border border-accent-light py-1 px-2">${t}</span>`).join(' ');

                    col.innerHTML = `
                        <div class="project-card h-100 p-4 d-flex flex-column">
                            <div class="bg-darker border border-white border-opacity-10 rounded-3 d-flex align-items-center justify-content-center text-accent mb-4" style="width: 48px; height: 48px;">
                                <i class="ph ${p.icon} fs-3"></i>
                            </div>
                            <h3 class="h5 fw-bold mb-3 text-white">${p.title}</h3>
                            <p class="text-secondary small mb-4 flex-grow-1 leading-relaxed">${p.desc}</p>
                            <div class="d-flex flex-wrap gap-1 mt-auto">
                                ${techSpans}
                            </div>
                        </div>
                    `;
                    grid.appendChild(col);
                });
            }

            // Initial render
            renderProjects('all');

            // Filter Click Events
            filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // Update active styles
                    filterBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');

                    // Filter
                    const filter = e.target.getAttribute('data-filter');
                    renderProjects(filter);
                });
            });

            // --- Contact Form & Custom Alert (Toast) ---
            const form = document.getElementById('contact-form');
            const toast = document.getElementById('toast');

            function showToast(message) {
                document.getElementById('toast-message').innerText = message;
                toast.classList.add('show');
                
                // Hide after 3 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Simulating sending process
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="ph ph-spinner-gap animate-spin"></i> Enviando...';
                btn.disabled = true;
                
                setTimeout(() => {
                    showToast("Sua mensagem foi enviada com sucesso! Retornarei em breve.");
                    form.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 1000);
            });
            
            // --- Header Scroll Effect ---
            const header = document.querySelector('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.style.paddingTop = '4px';
                    header.style.paddingBottom = '4px';
                    header.classList.add('shadow');
                } else {
                    header.style.paddingTop = '12px';
                    header.style.paddingBottom = '12px';
                    header.classList.remove('shadow');
                }
            });

            // Auto collapse mobile navbar after click on links
            const navLinks = document.querySelectorAll('.nav-link');
            const menuToggle = document.getElementById('navbarNav');
            const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false});
            
            navLinks.forEach((link) => {
                link.addEventListener('click', () => {
                    if (window.innerWidth < 992) {
                        bsCollapse.hide();
                    }
                });
            });

            // --- Gemini API Integration for AI Consultant ---
            const btnAiConsult = document.getElementById('btn-ai-consult');
            const aiPromptInput = document.getElementById('ai-prompt-input');
            const aiPlaceholder = document.getElementById('ai-placeholder');
            const aiLoader = document.getElementById('ai-loader');
            const aiResponseContainer = document.getElementById('ai-response-container');
            const aiResponseText = document.getElementById('ai-response-text');
            const aiCtaWhatsapp = document.getElementById('ai-cta-whatsapp');

            // Format sutil de Markdown para HTML em tempo de execução
            function formatMarkdown(text) {
                let formatted = text
                    .replace(/\n/g, '<br/>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/### (.*?)(<br\/>|$)/g, '<h3>$1</h3>')
                    .replace(/## (.*?)(<br\/>|$)/g, '<h3>$1</h3>')
                    .replace(/^- (.*?)(<br\/>|$)/gm, '<span class="d-flex align-items-start gap-2 mb-2"><i class="ph ph-caret-right text-accent mt-1"></i> <span>$1</span></span>');
                return formatted;
            }

            async function callGeminiAPI(prompt) {
                const apiKey = ""; // Mantido vazio conforme as diretrizes do ecossistema
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

                const systemInstruction = `Você é o co-piloto técnico de IA de Lucas Vinicius, um talentoso Engenheiro de Software, Engenheiro de Dados e especialista em Automação RPA.
O usuário vai descrever um desafio, processo lento ou necessidade de projeto.
Seu trabalho é analisar o desafio e formular uma resposta técnica estruturada que explique como o Lucas resolveria esse problema aplicando suas especialidades e stack tecnológica.

Habilidades chave de Lucas para basear sua resposta:
1. Engenharia de Software: Java / Spring Boot, Node.js (Express, NestJS), APIs REST/GraphQL, Docker, Kubernetes, AWS, GCP, CI/CD, React.
2. Engenharia e Análise de Dados: Python (Pandas, Numpy), SQL/NoSQL (PostgreSQL, MongoDB, Redis), Apache Spark, Datalakes, Airflow.
3. Automação de Processos: RPA, UiPath, Selenium, Python web scraping, OCR.

Responda em PORTUGUÊS de forma compacta, muito elegante, estimulante e focada na viabilidade técnica. Use Markdown simples de cabeçalhos (###), negritos (**) e listas com hífen (-).
Estruture em:
### 💡 Solução Proposta
Breve visão conceitual de como solucionar.
### 🛠️ Arquitetura e Engenharia
Como as stacks se integram (Software, Dados, ou Automação se aplicável).
### 📦 Tecnologias Chave Recomendadas
Quais das tecnologias de Lucas se encaixam perfeitamente neste desafio.`;

                const payload = {
                    contents: [{
                        parts: [{ text: `Desafio técnico do visitante: ${prompt}` }]
                    }],
                    systemInstruction: {
                        parts: [{ text: systemInstruction }]
                    }
                };

                let delay = 1000;
                for (let i = 0; i < 5; i++) {
                    try {
                        const response = await fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        if (response.ok) {
                            const data = await response.json();
                            return data.candidates?.[0]?.content?.parts?.[0]?.text;
                        }
                    } catch (err) {
                        // Silently retry
                    }
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                }
                throw new Error("Não foi possível processar a consulta neste momento devido ao limite de requisições. Por favor, tente novamente mais tarde.");
            }

            if (btnAiConsult) {
                btnAiConsult.addEventListener('click', async () => {
                    const promptText = aiPromptInput.value.trim();
                    if (!promptText) {
                        showToast("Por favor, descreva ou selecione um desafio técnico antes de analisar.");
                        return;
                    }

                    // Mudar UI para carregando
                    aiPlaceholder.classList.add('d-none');
                    aiResponseContainer.classList.add('d-none');
                    aiLoader.classList.remove('d-none');
                    btnAiConsult.disabled = true;

                    try {
                        const aiResponse = await callGeminiAPI(promptText);
                        
                        if (aiResponse) {
                            aiResponseText.innerHTML = formatMarkdown(aiResponse);
                            
                            // Ajustar link do Whatsapp com o desafio dinamicamente
                            const encodedMsg = encodeURIComponent(`Olá Lucas, usei o seu Consultor de IA do Portfólio sobre: "${promptText.substring(0, 60)}...". Gostaria de bater um papo para executarmos essa arquitetura!`);
                            aiCtaWhatsapp.href = `https://wa.me/5511999999999?text=${encodedMsg}`;
                            
                            aiLoader.classList.add('d-none');
                            aiResponseContainer.classList.remove('d-none');
                        } else {
                            throw new Error();
                        }
                    } catch (error) {
                        aiLoader.classList.add('d-none');
                        aiPlaceholder.classList.remove('d-none');
                        showToast("Erro ao contatar o assistente IA. Tente enviar de forma direta pelo WhatsApp ou Formulário de Contato.");
                    } finally {
                        btnAiConsult.disabled = false;
                    }
                });
            }
        });
    