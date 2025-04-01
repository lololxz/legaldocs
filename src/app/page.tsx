'use client'

import Link from 'next/link'
import { ArrowRight, FileText, Clock, Shield, CheckCircle, Star, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from'react-icons/bs';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
     {/* Navbar - Properly Centered */}
<nav className="fixed w-full z-50 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-lg supports-[backdrop-filter]:bg-gray-950/40">
  <div className="container mx-auto flex justify-center">
    <div className="flex justify-between items-center w-full max-w-6xl h-16">
      <div className="flex items-center gap-2">
        <Image 
          src="/logo.png" 
          alt="Legal Docs Logo" 
          width={32} 
          height={32} 
          className="object-contain rounded-full"
        />
        <h1 className="text-2xl font-bold text-white">Legal<span className="text-blue-400">Docs</span></h1>
      </div>
      
      <div className="hidden md:flex items-center space-x-6">
        <Link href="#features" className="text-zinc-300 hover:text-white transition-colors">Recursos</Link>
        <Link href="#benefits" className="text-zinc-300 hover:text-white transition-colors">Benefícios</Link>
        <Link href="#testimonials" className="text-zinc-300 hover:text-white transition-colors">Depoimentos</Link>
        <Link href="#pricing" className="text-zinc-300 hover:text-white transition-colors">Planos</Link>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" className="text-zinc-200 hover:text-white hover:bg-gray-800" asChild>
          <Link href="/login">Entrar</Link>
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white" asChild>
          <Link href="/register">Registrar</Link>
        </Button>
      </div>
    </div>
  </div>
</nav>
      {/* Hero Section - Centered in the middle of the site */}
<section className="container mx-auto flex justify-center items-center min-h-screen">
  <div className="flex flex-col items-center max-w-6xl w-full">
    <div className="text-center space-y-6">
      <Badge className="px-3 py-1 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border-0 mx-auto">
        Plataforma Jurídica Nº 1 no Brasil
      </Badge>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mt-6">
        Transforme sua Gestão
        <span className="block text-blue-400">Jurídica</span>
      </h1>
      <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mt-6">
        Simplifique processos, organize documentos e aumente sua produtividade com nossa plataforma inteligente para profissionais do Direito.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/20" asChild>
          <Link href="/login">
            Começar Gratuitamente <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button 
  size="lg" 
  variant="outline" 
  className="border border-gray-600 bg-gray-800/30 text-white hover:text-blue-400 hover:border-blue-400 hover:bg-gray-800/70 rounded-xl transition-all" 
  asChild
>
          <Link href="#demo">
            Ver Demonstração
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-4 text-sm text-zinc-300 justify-center">
      <div className="flex -space-x-2 items-center">
  {/* Avatares de usuários */}
  {[...Array(4)].map((_, i) => (
    <div 
      key={i} 
      className={`w-8 h-8 rounded-full border-2 border-gray-900 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden shadow-md`}
    >
      {/* Iniciais ou ícones dentro dos avatares */}
      <span className="text-xs font-semibold text-gray-300">
        {['JD', 'MS', 'AL', 'RB'][i]}
      </span>
      
      {/* Alternativa: imagens de avatar */}
      {/* <Image 
        src={`/avatars/user-${i+1}.jpg`} 
        alt={`Usuário ${i+1}`} 
        width={32} 
        height={32} 
        className="object-cover w-full h-full"
      /> */}
    </div>
  ))}
  
  {/* Contador de usuários adicionais */}
  <div className="w-8 h-8 rounded-full border-2 border-gray-900 bg-blue-600 flex items-center justify-center shadow-md">
    <span className="text-xs font-bold text-white">+12</span>
  </div>
</div>
        <div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          <p>Mais de 2.000 advogados confiam em nós</p>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Stats Section - Centralized */}
      <section className="container mx-auto flex justify-center py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl">
          {[
            { value: '10K+', label: 'Usuários Ativos' },
            { value: '98%', label: 'Satisfação' },
            { value: '24/7', label: 'Suporte' },
            { value: '50+', label: 'Integrações' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-zinc-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section - Centralized */}
      <section id="features" className="container mx-auto flex justify-center py-24">
        <div className="max-w-6xl w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border-0 mx-auto">
              Recursos Exclusivos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Tudo o que você precisa em um só lugar</h2>
            <p className="text-zinc-300 text-lg">Nossa plataforma foi desenvolvida pensando nas necessidades específicas dos profissionais jurídicos.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: 'Gestão Documental',
                description: 'Organize e acesse seus documentos jurídicos de forma rápida e segura com busca avançada e categorização automática.'
              },
              {
                icon: Clock,
                title: 'Controle de Prazos',
                description: 'Acompanhe deadlines importantes e receba lembretes automáticos para nunca perder uma data importante.'
              },
              {
                icon: Shield,
                title: 'Segurança Garantida',
                description: 'Seus dados protegidos com a mais alta tecnologia de criptografia e conformidade com LGPD.'
              },
              {
                icon: Users,
                title: 'Colaboração em Equipe',
                description: 'Trabalhe em conjunto com sua equipe, compartilhe documentos e delegue tarefas com controle de permissões.'
              },
              {
                icon: Zap,
                title: 'Automação de Processos',
                description: 'Crie modelos de documentos e automatize fluxos de trabalho repetitivos para economizar tempo.'
              },
              {
                icon: CheckCircle,
                title: 'Relatórios Detalhados',
                description: 'Visualize métricas importantes sobre seus casos e desempenho com dashboards personalizáveis.'
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-800/50 transition-colors overflow-hidden group text-center">
                <div className="absolute h-1 left-0 right-0 top-0 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <CardHeader className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 hover:text-zinc-200 transition-colors">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Centralized */}
      <section id="benefits" className="container mx-auto flex justify-center py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl">
          <div className="text-center md:text-left">
            <Badge className="mb-4 px-3 py-1 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border-0 mx-auto md:mx-0">
              Benefícios
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Por que escolher o LegalDocs?</h2>
            <p className="text-zinc-300 mb-8 text-lg">Nossa plataforma foi desenvolvida por advogados para advogados, entendendo as necessidades específicas do setor jurídico brasileiro.</p>
            
            <div className="space-y-6">
              {[
                {
                  title: 'Interface intuitiva e moderna',
                  description: 'Design pensado para facilitar seu dia a dia, sem complicações.'
                },
                {
                  title: 'Suporte técnico especializado',
                  description: 'Equipe dedicada para resolver suas dúvidas em tempo recorde.'
                },
                {
                  title: 'Atualizações constantes',
                  description: 'Novas funcionalidades baseadas no feedback dos usuários.'
                },
                {
                  title: 'Integração com outros sistemas',
                  description: 'Conecte com ferramentas que você já utiliza no seu escritório.'
                }
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4 justify-center md:justify-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-blue-400 h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{benefit.title}</h3>
                    <p className="text-zinc-300">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative" id="demo">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
            <Card className="aspect-video flex items-center justify-center bg-gray-900/70 backdrop-blur-sm border-gray-800/50 relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-[url('/video-placeholder.jpg')] bg-cover bg-center opacity-30"></div>
              <div className="relative z-10 flex justify-center">
                <Image 
                  src="/video-placeholder.png" 
                  alt="Legal Docs Logo" 
                  width={574} 
                  height={356} 
                  className="object-contain rounded-3xl"
                  priority
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Centralized */}
      <section id="testimonials" className="container mx-auto flex justify-center py-24">
        <div className="max-w-6xl w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border-0 mx-auto">
              Depoimentos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">O que nossos clientes dizem</h2>
            <p className="text-zinc-300 text-lg">Descubra como o LegalDocs tem transformado a rotina de escritórios jurídicos por todo o Brasil.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Ana Oliveira',
                role: 'Advogada Tributarista',
                content: 'O LegalDocs revolucionou a forma como gerencio meus processos. Economizo pelo menos 10 horas por semana com as automações.',
                rating: 5
              },
              {
                name: 'Carlos Mendes',
                role: 'Sócio de Escritório',
                content: 'A facilidade de compartilhar documentos com a equipe e controlar os acessos trouxe mais segurança para nosso escritório.',
                rating: 5
              },
              {
                name: 'Juliana Costa',
                role: 'Advogada Trabalhista',
                content: 'O controle de prazos é impecável. Desde que começamos a usar, nunca mais perdemos um deadline importante.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm p-6 relative text-center">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="flex items-center gap-2 mb-4 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-zinc-200 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3 justify-center">
                  <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-blue-400 font-medium">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{testimonial.name}</h4>
                    <p className="text-zinc-300 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Centralized */}
      <section id="pricing" className="container mx-auto flex justify-center py-24">
        <div className="max-w-6xl w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border-0 mx-auto">
              Planos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Escolha o plano ideal para você</h2>
            <p className="text-zinc-300 text-lg">Oferecemos opções flexíveis que se adaptam ao tamanho do seu escritório e necessidades.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Básico',
                price: 'R$ 99',
                description: 'Ideal para profissionais autônomos',
                features: [
                  'Até 100 documentos',
                  'Controle de prazos básico',
                  'Acesso para 1 usuário',
                  'Suporte por email'
                ],
                popular: false,
                cta: 'Começar Grátis'
              },
              {
                name: 'Profissional',
                price: 'R$ 249',
                description: 'Perfeito para escritórios pequenos',
                features: [
                  'Documentos ilimitados',
                  'Controle de prazos avançado',
                  'Até 5 usuários',
                  'Automações básicas',
                  'Suporte prioritário'
                ],
                popular: true,
                cta: 'Experimentar 14 dias'
              },
              {
                name: 'Empresarial',
                price: 'R$ 499',
                description: 'Para escritórios de médio e grande porte',
                features: [
                  'Documentos ilimitados',
                  'Controle de prazos avançado',
                  'Usuários ilimitados',
                  'Automações avançadas',
                  'API para integrações',
                  'Gerente de conta dedicado'
                ],
                popular: false,
                cta: 'Falar com Consultor'
              }
            ].map((plan, index) => (
              <Card key={index} className={`bg-gray-900/50 border-gray-800/50 backdrop-blur-sm relative overflow-hidden text-center ${plan.popular ? 'ring-2 ring-blue-500 transform md:-translate-y-4' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center text-sm py-1">
                    Mais Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-zinc-300">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-zinc-300">/mês</span>
                  </div>
                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 justify-center">
                        <CheckCircle className="h-5 w-5 text-blue-400" />
                        <span className="text-zinc-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-800 hover:bg-gray-700'} text-white`}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Centralized */}
      <section className="container mx-auto flex justify-center py-24">
        <div className="max-w-6xl w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border-0 mx-auto">
              Perguntas Frequentes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Dúvidas comuns</h2>
            <p className="text-zinc-300 text-lg">Encontre respostas para as perguntas mais frequentes sobre nossa plataforma.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'Preciso instalar algum software?',
                answer: 'Não, o LegalDocs é uma solução 100% baseada na nuvem. Você só precisa de um navegador e conexão com a internet para acessar.'
              },
              {
                question: 'Meus dados estão seguros?',
                answer: 'Sim, utilizamos criptografia de ponta a ponta e seguimos todas as diretrizes da LGPD para garantir a segurança e privacidade dos seus dados.'
              },
              {
                question: 'Posso cancelar a qualquer momento?',
                answer: 'Sim, não exigimos fidelidade. Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.'
              },
              {
                question: 'Oferecem treinamento para a equipe?',
                answer: 'Sim, todos os planos incluem acesso a vídeos de treinamento. Os planos Profissional e Empresarial também incluem sessões de onboarding personalizadas.'
              },
              {
                question: 'Como funciona o período de testes?',
                answer: 'Você tem acesso a todas as funcionalidades do plano escolhido por 14 dias, sem compromisso. Não é necessário cartão de crédito para começar.'
              },
              {
                question: 'Posso migrar meus dados de outro sistema?',
                answer: 'Sim, oferecemos assistência na migração de dados de outros sistemas para o LegalDocs, garantindo uma transição tranquila.'
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800/50 backdrop-blur-sm hover:bg-gray-800/50 transition-colors text-center">
                <CardHeader>
                  <CardTitle className="text-lg text-white">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Centralized */}
      <section className="container mx-auto flex justify-center py-24">
        <div className="max-w-6xl w-full">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-center opacity-20"></div>
            
            <div className="relative p-12 md:p-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white max-w-3xl mx-auto">
                Pronto para revolucionar sua gestão jurídica?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de profissionais que já transformaram sua forma de trabalhar.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                  <Link href="/register">
                    Criar Conta Grátis <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
  size="lg" 
  variant="outline" 
  className="border-2 border-white/80 text-white bg-white/10 hover:bg-white/20 hover:border-white transition-all" 
  asChild
>
  <Link href="#demo">
    Ver Demonstração
  </Link>
</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Centralized */}
      <footer className="border-t border-gray-800/50 py-12 bg-gray-950">
        <div className="container mx-auto flex justify-center">
          <div className="max-w-6xl w-full">
            <div className="grid md:grid-cols-4 gap-8 mb-12 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Legal<span className="text-blue-400">Docs</span></h3>
                </div>
                <p className="text-zinc-300 mb-4">
                  Transformando a gestão jurídica com tecnologia de ponta.
                </p>
                <div className="flex gap-4">
  <Link href="https://www.twitter.com/lorexifofo" className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-zinc-300 hover:bg-blue-500 hover:text-white transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
    </svg>
    <span className="sr-only">Twitter</span>
  </Link>
  
  <Link href="#facebook" className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-zinc-300 hover:bg-blue-500 hover:text-white transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
    </svg>
    <span className="sr-only">Facebook</span>
  </Link>
  
  <Link href="https://www.instagram.com/lolo.lxz" className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-zinc-300 hover:bg-blue-500 hover:text-white transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
    </svg>
    <span className="sr-only">Instagram</span>
  </Link>
  
  <Link href="#linkedin" className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-zinc-300 hover:bg-blue-500 hover:text-white transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
    </svg>
    <span className="sr-only">LinkedIn</span>
  </Link>
</div>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <h4 className="font-medium text-white mb-4">Produto</h4>
                <ul className="space-y-3">
                  {['Recursos', 'Preços', 'Casos de uso', 'Segurança', 'Atualizações'].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-zinc-300 hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <h4 className="font-medium text-white mb-4">Empresa</h4>
                <ul className="space-y-3">
                  {['Sobre nós', 'Blog', 'Carreiras', 'Contato', 'Imprensa'].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-zinc-300 hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <h4 className="font-medium text-white mb-4">Suporte</h4>
                <ul className="space-y-3">
                  {['Central de Ajuda', 'Documentação', 'Comunidade', 'Status', 'Webinars'].map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-zinc-300 hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-zinc-300 text-sm mb-4 md:mb-0">© 2024 LegalDocs. Todos os direitos reservados.</p>
              <div className="flex gap-6">
                <Link href="#" className="text-zinc-300 hover:text-white transition-colors text-sm">
                  Termos de Serviço
                </Link>
                <Link href="#" className="text-zinc-300 hover:text-white transition-colors text-sm">
                  Política de Privacidade
                </Link>
                <Link href="#" className="text-zinc-300 hover:text-white transition-colors text-sm">
                  Cookies
                </Link>
              </div>
              </div>
          </div>
        </div>
      </footer>
    </div>
  )
}