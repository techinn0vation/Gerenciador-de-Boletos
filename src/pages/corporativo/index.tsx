import {
  WrapperCorporativo,
  ContentCorporativo,
  AreaTextCorporativo,
  TextBlock,
  ButtonCopyText
} from '..//..//components/StylesPages/StylesCorporativo'

import {
  Layout,
  SideBar,
  Headline,
  DisplayTitle,
  DisplayTypography,
  TabelaValores
} from '..//..//components/GeralComponents'

import React, { useState } from 'react'

export default function Corporativo() {
  const [buttonText, setButtonText] = useState('Copiar')

  const handleCopyText = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Texto copiado com sucesso!')
        setButtonText('Copiado!')
        setTimeout(() => {
          setButtonText('Copiar')
        }, 2000)
      })
      .catch(error => {
        console.error('Erro ao copiar o texto:', error)
      })
  }
  return (
    <Layout>
      <WrapperCorporativo>
        <SideBar />
        <ContentCorporativo>
          <Headline title="frases e acordos" text="frases e acordos" />
          <AreaTextCorporativo>
            <TextBlock id="textBlock1">
              <DisplayTitle DisplayTitle="atendimento" />
              <DisplayTypography
                DisplayTypography="
              olá, meu nome é [NOME DO ATENDENTE] e sou responsável pela sua negociação. Sou a assistente virtual encarregada de ajudá-lo nesse processo.
            "
              />
              <DisplayTypography
                DisplayTypography="
              já temos uma proposta disponível e vamos enviá-la para você. No nosso sistema, não consta nenhum débito registrado em seu CPF. Apenas são consultados registros de dívidas do período de até 60 meses.
            "
              />
              <DisplayTypography
                DisplayTypography="
              infelizmente, no momento, não estamos realizando consultas para CNPJ. Assim que tivermos acesso novamente, verificarei para você.
            "
              />
              <DisplayTypography
                DisplayTypography="
              sim, temos acesso a todos os seus dados devido à parceria entre o SERASA e as empresas.
            "
              />
              <DisplayTypography
                DisplayTypography="
              olá! Temos um super desconto relâmpago! Que tal aproveitar para renegociar todos os débitos em seu CPF hoje?
              Em nosso sistema, não há nenhum débito registrado em seu CPF. Parabéns!
              Caso você faça o pagamento no valor acordado, seu nome ficará limpo em até 72 horas.
              O acordo é feito com base no valor total dos débitos em seu CPF. Não é possível obter o mesmo desconto para dívidas separadamente.
            "
              />
              <DisplayTypography
                DisplayTypography="
              Que pena! Pedimos que entre em contato novamente em uma data mais conveniente para uma nova negociação. Lembrando que os valores estão sujeitos a alterações.
              Solicitamos que você confirme o seu acordo apenas se tiver total certeza do pagamento, pois a falta de pagamento resultará na quebra do acordo, e não será possível realizá-lo novamente, cancelando todos os descontos oferecidos. Cliente, você confirma o seu pagamento para hoje?
            "
              />
              <DisplayTypography
                DisplayTypography="
              Certo! Peço que aguarde um momento enquanto finalizamos o seu acordo. Em breve, você receberá o boleto.
              Cliente, seu acordo foi concluído com sucesso! Em instantes, você receberá o seu boleto! Anote por gentileza o seu protocolo de atendimento: 8000174593.
              Por favor, mantenha contato com o atendente que iniciou e finalizou o seu acordo.
            "
              />
              <DisplayTypography
                DisplayTypography="
              Bom dia! Posso prosseguir com o acordo com base na proposta que fizemos ontem?
            "
              />
              <ButtonCopyText
                onClick={() => {
                  const element = document.getElementById('textBlock1')
                  if (element != null) {
                    handleCopyText(element.innerText)
                  }
                }}
              >
                {buttonText}
              </ButtonCopyText>
            </TextBlock>
            <TextBlock id="textBlock2">
              <DisplayTitle DisplayTitle="avalista após anexar boleto" />

              <DisplayTypography
                DisplayTypography="
                segue o boleto para pagamento, preferencialmente por meio de internet banking, caixa eletrônico ou em qualquer casa lotérica. Após efetuar o pagamento, pedimos que gentilmente envie o comprovante para agilizar a baixa em nosso sistema. No boleto constará o nome do responsável técnico e avalista, [NOME DO AVALISTA] S.A., Serviço de Feirão Acordo. Essa pessoa é responsável pela baixa das suas pendências."
              />
              <DisplayTypography
                DisplayTypography="
                toda negociação requer um avalista legalmente responsável para ser concretizada. [NOME DO AVALISTA] é a pessoa responsável pelo acordo, sendo seu avalista junto às empresas nas quais você possui dívidas, e também é associado à nossa empresa."
              />
              <DisplayTypography
                DisplayTypography="
                os serviços da Serasa se destacam no mercado. Ao trabalharmos com consultas, é essencial que tenhamos a certeza de receber todas as informações necessárias. Além disso, a confiança é fundamental tanto para nós quanto para nossos clientes."
              />
              <DisplayTypography
                DisplayTypography="
                desde 2015, fazemos parte do grupo SERASA Experian, a maior referência mundial em serviços de informação. Por meio de soluções tecnológicas e inovadoras, aproveitamos o poder dos dados para ampliar oportunidades para pessoas e empresas. Somos uma empresa de negociação de dívidas online que surgiu para auxiliar os mais de 63 milhões de brasileiros (cerca de 68% das famílias do país) que estão endividados."
              />
              <DisplayTypography
                DisplayTypography="
                infelizmente, existem muitos golpes envolvendo nossa empresa. Orientamos que denuncie aos órgãos responsáveis sempre que suspeitar de uma negociação fraudulenta. Por esse motivo, nos resguardamos com nossa experiência de anos no mercado e permitimos que nossos clientes confirmem seus acordos apenas se estiverem seguros da negociação. Confirme o seu acordo somente se estiver totalmente convicto sobre ele."
              />
              <ButtonCopyText
                onClick={() => {
                  const element = document.getElementById('textBlock2')
                  if (element != null) {
                    handleCopyText(element.innerText)
                  }
                }}
              >
                {buttonText}
              </ButtonCopyText>
            </TextBlock>
            <TextBlock id="textBlock3">
              <DisplayTitle DisplayTitle="dúvidas sobre formas de pagamento" />
              <DisplayTypography
                DisplayTypography="
                esta proposta é válida apenas até o dia de hoje. Após essa data, será necessário entrar em contato novamente para agendar uma nova negociação e solicitar um novo acordo.
                O valor oferecido é válido apenas para pagamento à vista, devido ao grande desconto concedido!
                Vou verificar com a Central a possibilidade de conceder mais algum desconto. Por favor, aguarde!
                Podemos verificar a opção de parcelamento com a Central. Para isso, gostaríamos de saber qual seria o valor máximo que você poderia pagar como entrada hoje.
              "
              />
              <DisplayTypography
                DisplayTypography="
                sim, estamos aguardando a Central emitir o seu boleto. Em breve, enviaremos para você!
                Os boletos são gerados com data para pagamento no dia, pois os valores podem sofrer alterações de acordo com a data em que são solicitados, incluindo possíveis variações de juros.
                O pagamento é feito por meio de boleto, e você pode efetuá-lo através do internet banking, caixa eletrônico ou em qualquer casa lotérica.
                Caso você confirme o acordo, seu boleto será gerado e enviado pelo WhatsApp.
                Ao efetuar o pagamento no valor acordado, seu nome ficará limpo em até 72 horas!
                Caso você não consiga fazer o pagamento hoje, posso deixar o seu acordo em aberto no sistema até amanhã, mantendo o mesmo desconto. Dessa forma, você não será prejudicado caso não consiga pagar o boleto gerado hoje.
              "
              />
              <DisplayTypography
                DisplayTypography="
                os descontos são possíveis devido à parceria entre o SERASA e várias empresas. Por favor, confirme o seu acordo somente se tiver total certeza do pagamento, 
                pois o não pagamento resultará na quebra do acordo, e não será possível realizá-lo novamente, anulando todos os descontos oferecidos."
              />
              <DisplayTypography
                DisplayTypography="
                vou verificar com a Central a possibilidade de conceder mais algum desconto válido apenas para pagamento na data de hoje. Por favor, aguarde!
                O valor oferecido é válido apenas para pagamento à vista na data de hoje, devido ao grande desconto concedido!
                Posso tentar negociar um desconto maior com a Central se o pagamento for feito à vista hoje, mas não tenho autorização para parcelar nesse valor. Posso tentar obter um desconto maior para você?
              "
              />
              <DisplayTypography
                DisplayTypography="
                Podemos verificar a opção de parcelamento com a Central, para isso, precisamos saber qual seria o valor máximo que você poderia pagar como entrada na data de hoje.
                Sim, estamos aguardando a Central emitir o seu boleto. Em breve, enviaremos para você!
                Vou repassar a sua situação ao meu supervisor. Por favor, aguarde.
                Estou solicitando agora à Central o seu contrato de quitação. Por favor, aguarde!
                Posso deixar o seu contrato em aberto até amanhã, mas caso o acordo não seja pago, ficará registrado no sistema como uma discordância, e não será mais possível gerar descontos para as suas dívidas.
              "
              />
              <DisplayTypography
                DisplayTypography="
                caso não seja pago na data acordada, ficará registrado no sistema como uma discordância, e não será mais possível gerar descontos para as suas dívidas.
              "
              />
              <DisplayTypography
                DisplayTypography="
                o boleto é emitido em nome do Feirão do Acordo e do avalista sócio responsável por avalizar o seu acordo junto às empresas.
                É por meio do avalista sócio que conseguimos obter os descontos oferecidos, pois ele é o responsável
              "
              />
              <ButtonCopyText
                onClick={() => {
                  const element = document.getElementById('textBlock3')
                  if (element != null) {
                    handleCopyText(element.innerText)
                  }
                }}
              >
                {buttonText}
              </ButtonCopyText>
            </TextBlock>
            <TextBlock id="textBlock4">
              <DisplayTitle DisplayTitle="parcelamento no cartão" />
              <DisplayTypography
                DisplayTypography="
              para parcelamento trabalhamos com o PicPay,te enviamos o boleto e por la você consegue
                efetuar o pagamento pelo cartão de crédito, podendo parcelar em até 12x"
              />
              <ButtonCopyText
                onClick={() => {
                  const element = document.getElementById('textBlock4')
                  if (element != null) {
                    handleCopyText(element.innerText)
                  }
                }}
              >
                {buttonText}
              </ButtonCopyText>
            </TextBlock>
            <TextBlock id="textBlock5">
              <DisplayTitle DisplayTitle="frases" />
              <DisplayTypography
                DisplayTypography="
                os boletos são gerados com data para pagamento no dia, pois podem sofrer alterações de valores de acordo com a data em que são solicitados,
                incluindo possíveis variações de juros."
              />
              <DisplayTypography DisplayTypography="certo! Por favor, me chame novamente na melhor data para o pagamento, e assim finalizaremos o seu acordo." />
              <DisplayTypography
                DisplayTypography="sim, o boleto já foi enviado. No entanto, devido à grande demanda de acordos fechados no dia, 
              nosso sistema de envio de e-mails está um pouco lento. Em breve, você receberá o seu boleto!"
              />
              <DisplayTypography
                DisplayTypography="
                o interesse em efetuar o pagamento do seu acordo é exclusivamente seu, pois o mesmo pode ser pago por meio do internet banking ou caixa eletrônico! Caso deseje,
                podemos cancelar o seu acordo imediatamente!
              "
              />
              <DisplayTypography
                DisplayTypography="
                ao realizar o pagamento no valor de R$ [VALOR], todos os débitos mencionados serão quitados e o seu nome estará limpo novamente!
                Pedimos que aguarde o envio do seu boleto amanhã, no primeiro horário. Desde já, agradecemos pelo seu contato.
                O boleto está em processo de emissão, assim que for gerado, será enviado. Pedimos que aguarde, por gentileza.
                Estamos enfrentando uma instabilidade no sistema, e pedimos desculpas pelo transtorno. Por favor, aguarde o envio do boleto.
              "
              />
              <DisplayTypography
                DisplayTypography="
                sim, em relação aos protestos, contamos com advogados especializados para lidar com a parte burocrática. Eles poderão ajudar nessa negociação com o cartório!
                Seus débitos já estão em processo de protesto. Nesse caso, apenas o cartório poderá informar o credor. Recomendamos que procure o cartório mais próximo para obter mais informações.
                Em nosso sistema, constam apenas os débitos mencionados anteriormente, registrados no seu CPF.
                Infelizmente, não temos acesso a áudios. Por favor, envie a sua solicitação por escrito.
              "
              />
              <DisplayTypography
                DisplayTypography="
                pedimos que aguarde o prazo informado anteriormente. Dentro desse prazo, a baixa do seu acordo será realizada. Caso tenha alguma dúvida, pode nos contatar,
                estamos à disposição para esclarecimentos. Fique tranquilo.
              "
              />
              <DisplayTypography
                DisplayTypography="
                enviamos o seu boleto pelo WhatsApp para garantir a agilidade no recebimento. Em breve, você também receberá por e-mail!
              "
              />
              <DisplayTypography DisplayTypography="posso ajudar em mais alguma coisa?" />
              <DisplayTypography DisplayTypography="parabenizamos pelo acordo bem-sucedido e agradecemos desde já pelo seu contato." />
              <ButtonCopyText
                onClick={() => {
                  const element = document.getElementById('textBlock5')
                  if (element != null) {
                    handleCopyText(element.innerText)
                  }
                }}
              >
                {buttonText}
              </ButtonCopyText>
            </TextBlock>
            <TextBlock id="textBlock6">
              <DisplayTitle DisplayTitle="site" />
              <DisplayTypography
                DisplayTypography="
                em nosso site [www.serasa.com.br] estão disponíveis todos os dados da nossa empresa, Incluindo CNPJ, telefones e endereços.
                Em caso de dúvidas pedimos que entre e verifique!"
              />
              <ButtonCopyText
                onClick={() => {
                  const element = document.getElementById('textBlock6')
                  if (element != null) {
                    handleCopyText(element.innerText)
                  }
                }}
              >
                {buttonText}
              </ButtonCopyText>
            </TextBlock>
            <TextBlock id="textBlock7">
              <DisplayTitle DisplayTitle="segurança" />
              <DisplayTypography
                DisplayTypography="
                nossa empresa tem como objetivo proporcionar maior comodidade aos nossos clientes na hora de liquidar suas dívidas, oferecendo excelentes descontos. Devido à situação do COVID-19, todo o processo é realizado aqui no WhatsApp, sem a necessidade de ir a um estabelecimento ou fazer uma ligação, 
                garantindo total conforto e segurança para você. Acreditamos que você já tenha conhecimento dos débitos pendentes. 
                Estamos aqui para ajudá-lo a obter seu crédito novamente. No entanto, se você não se sentir seguro, 
                recomendamos que faça o pagamento diretamente com a empresa responsável pelos débitos.
              "
              />
              <DisplayTypography
                DisplayTypography="
                o interesse em efetuar o pagamento do seu acordo é exclusivamente seu. Caso deseje, podemos cancelar o seu acordo imediatamente."
              />
              <DisplayTypography
                DisplayTypography="
                todos os dados contidos no boleto referem-se ao acordo fechado. Até o momento, nunca tivemos problemas como o mencionado. No entanto, 
                entendemos que é seu direito se resguardar diante de qualquer suspeita. Estamos à disposição caso decida concretizar o acordo.
                Seu nome permanecerá como devedor até que as dívidas mencionadas sejam quitadas.
              "
              />
              <ButtonCopyText
                onClick={() => {
                  const element = document.getElementById('textBlock7')
                  if (element != null) {
                    handleCopyText(element.innerText)
                  }
                }}
              >
                {buttonText}
              </ButtonCopyText>
            </TextBlock>
            <TextBlock id="textBlock8">
              <DisplayTitle DisplayTitle="cobrança" />
              <DisplayTypography
                DisplayTypography="
                estamos aguardando seu comprovante de pagamento para que possamos agilizar a sua baixa com mais rapidez!
                Não foi identificado o pagamento do boleto de quitação enviado, caso tenha ocorrido algum problema nos comunique, para que o mesmo possa ser resolvido.
                Viemos aqui apenas para lembrar que assim que efetuar o pagamento do seu boleto, para nos enviar o comprovante! Pois já poderemos solicitar a baixa dos débitos pendentes em seu CPF!"
              />
              <ButtonCopyText
                onClick={() => {
                  const element = document.getElementById('textBlock8')
                  if (element != null) {
                    handleCopyText(element.innerText)
                  }
                }}
              >
                {buttonText}
              </ButtonCopyText>
            </TextBlock>
            <TextBlock id="textBlock9">
              <DisplayTitle DisplayTitle="pós pagamento" />
              <DisplayTypography
                DisplayTypography="
                seu comprovante de pagamento será encaminhado para nosso setor financeiro. Pedimos que aguarde um prazo de até 72 horas para que as baixas sejam processadas. 
                A baixa acontecerá automaticamente e você receberá uma mensagem informando sobre isso.
              "
              />
              <DisplayTypography
                DisplayTypography="
                agradecemos pelo seu pagamento. Estamos à disposição caso tenha alguma dúvida.
              "
              />
              <DisplayTypography
                DisplayTypography="
                no caso de acordos fechados de forma parcelada, serão enviados juntamente com o contrato de quitação as parcelas restantes, 
                conforme especificado com o atendente.
              "
              />
              <DisplayTypography
                DisplayTypography="
                assim que o sistema identificar seu pagamento, enviarei o contrato do acordo com todas as especificações
                para que você fique resguardado de qualquer eventualidade futura.
              "
              />
              <DisplayTypography
                DisplayTypography="
                lembramos que seu acordo foi fechado de forma parcelada, com uma entrada de R$X,XX e mais 5 parcelas. 
                A primeira parcela vence 30 dias após o fechamento do acordo. 
                Após o pagamento da entrada do acordo, seu nome ficará limpo em até 72 horas.
              "
              />
              <DisplayTypography
                DisplayTypography="
                é importante ressaltar que o não pagamento de qualquer uma das parcelas restantes do acordo resultará na quebra do contrato, 
                e seu nome poderá ser vinculado novamente ao Serasa. O contrato, que descreve todos os termos do acordo,
                e os boletos com as parcelas restantes serão enviados automaticamente após a baixa do pagamento da entrada.
              "
              />
              <DisplayTypography
                DisplayTypography="
                não identificamos o pagamento do boleto de quitação que foi enviado. 
                Caso tenha ocorrido algum problema, por favor, nos informe para que possamos resolver a questão.
              "
              />
              <DisplayTypography
                DisplayTypography="
                estamos aguardando o seu comprovante de pagamento para agilizar a baixa do seu acordo com mais rapidez.
              "
              />
              <DisplayTypography
                DisplayTypography="
                para parcelamentos, trabalhamos com o PicPay. Enviaremos o boleto e você poderá efetuar o pagamento pelo cartão de crédito, parcelando em até 12 vezes.
              "
              />
              <ButtonCopyText
                onClick={() => {
                  const element = document.getElementById('textBlock9')
                  if (element != null) {
                    handleCopyText(element.innerText)
                  }
                }}
              >
                {buttonText}
              </ButtonCopyText>
            </TextBlock>
            <TextBlock id="textBlock10">
              <DisplayTitle DisplayTitle="ADS antigo que não fechou acordo" />
              <DisplayTypography DisplayTypography="olá, bom dia!" />
              <DisplayTypography
                DisplayTypography="
                *super desconto relâmpago para data de hoje!* Últimos dias para renegociar seus débitos com ótimos descontos. Informe seu cpf agora mesmo e solicite sua proposta!
                Senhor (A) , devido á um erro de sistema, todos os boletos gerados na data de hoje estão com erro Peço que aguarde que enviaremos um novo boleto para pagamento.
              "
              />
              <DisplayTypography
                DisplayTypography="
                pedimos desculpas pela demora no atendimento, pois além de todo cuidado relacionado ao covid 19, também estávamos passando por instabilidade de sistema! 
                Caso tenha realmente interesse em um acordo,por gentileza nos informe o número do seu CPF ou CNPJ!
              "
              />
              <ButtonCopyText
                onClick={() => {
                  const element = document.getElementById('textBlock10')
                  if (element != null) {
                    handleCopyText(element.innerText)
                  }
                }}
              >
                {buttonText}
              </ButtonCopyText>
            </TextBlock>
            <TextBlock id="textBlock11">
              <DisplayTitle DisplayTitle="saudação" />
              <DisplayTypography
                DisplayTypography="
                Olá, bem vindo ao Feirão do Acordo Serasa Limpa Nome! Caso tenha realmente interesse em um acordo, por gentileza nos informe o número do seu CPF ou CNPJ!
                *Lembrando que nosso atendimento é por ordem de recebimento das mensagens*
              "
              />
              <DisplayTypography
                DisplayTypography="
                pedimos desculpas pela demora no atendimento, pois além de todo cuidado relacionado ao covid 19, também estávamos passando por instabilidade de sistema! 
                Caso tenha realmente interesse em um acordo,por gentileza nos informe o número do seu CPF ou CNPJ!
              "
              />
              <ButtonCopyText
                onClick={() => {
                  const element = document.getElementById('textBlock11')
                  if (element != null) {
                    handleCopyText(element.innerText)
                  }
                }}
              >
                {buttonText}
              </ButtonCopyText>
            </TextBlock>
            <TextBlock id="textBlock12">
              <DisplayTitle DisplayTitle="quando não sabe sobre a dívida" />
              <DisplayTypography
                DisplayTypography="
                caso desconheça as dívidas informadas acima, pedimos para que entre em contato com o credor e saber o porque a divida esta registrada em seu CPF.
              "
              />
              <ButtonCopyText
                onClick={() => {
                  const element = document.getElementById('textBlock12')
                  if (element != null) {
                    handleCopyText(element.innerText)
                  }
                }}
              >
                {buttonText}
              </ButtonCopyText>
            </TextBlock>
          </AreaTextCorporativo>
        </ContentCorporativo>
      </WrapperCorporativo>
      <TabelaValores />
    </Layout>
  )
}
