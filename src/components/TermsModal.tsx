import {
  Modal,
  ModalProps,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { colors, fonts } from '@theme/index'

type Props = ModalProps & {
  acceptTerms: () => void
  declineTerms: () => void
}

export function TermsModal({ acceptTerms, visible, declineTerms }: Props) {
  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <ScrollView style={styles.container} indicatorStyle="default">
        <Text style={styles.title}>Termos e condições</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          sunt aspernatur pariatur aliquam cum rerum laudantium, ipsa vero
          tempore earum id ex accusamus suscipit maiores magnam tempora. Nisi
          suscipit ipsa explicabo maxime repellendus vero rerum ratione saepe
          cumque modi consequatur, minus laudantium, a, velit vitae neque sed
          porro ipsam consectetur sapiente! Veritatis odio exercitationem
          voluptas dignissimos adipisci temporibus facere illo omnis libero
          laboriosam tempore aspernatur quidem eos fugit error sed nemo minima,
          totam nihil nobis, dolore dicta maiores. Error corrupti maiores
          assumenda, iusto sed ut. Perferendis odit necessitatibus tenetur
          aliquid, ex, quia doloremque iusto consequuntur rerum architecto optio
          tempore, ipsam omnis. Fugiat laudantium, dolorum, aspernatur culpa
          nemo voluptas vel sunt reiciendis nihil omnis ex fuga delectus ea.
          Placeat cupiditate, aliquam, inventore nostrum labore laboriosam
          voluptate, commodi saepe nemo culpa obcaecati dicta! Atque unde illo
          odit dolorem neque doloribus doloremque enim dolores error iste ullam
          ipsam distinctio autem sed recusandae facilis repudiandae dicta nobis
          sapiente totam ducimus, molestias nemo? Consequatur, illo? Nemo quia
          deserunt numquam iusto cumque sunt, quaerat rem blanditiis beatae
          tenetur, fugiat libero eos, eaque repellendus reiciendis alias debitis
          ab nam est culpa! Temporibus quae quisquam vitae laboriosam laudantium
          deleniti enim, aut laborum id veritatis! Totam dolor placeat
          recusandae, quos neque consequatur ex similique! Doloremque voluptate
          at asperiores aspernatur! Saepe possimus omnis dolorem quos enim
          pariatur dicta doloribus consectetur assumenda. Veniam totam
          laboriosam necessitatibus quidem. Molestiae, consectetur enim
          provident quod, quas esse, pariatur et obcaecati sunt neque minima.
          Impedit nemo, ex corporis nihil cupiditate iusto tenetur quae possimus
          eum. Nam odio sapiente ex dignissimos tenetur obcaecati beatae,
          voluptas porro officia cumque facere, quos quasi in maxime perferendis
          nihil suscipit, id minus! Ipsa inventore atque quisquam illum error
          maxime distinctio reprehenderit incidunt nemo perspiciatis, voluptas
          fuga nobis quibusdam alias cupiditate ab amet porro consectetur
          tenetur laboriosam aut adipisci! Reprehenderit ipsam eius eaque, velit
          dolorum deserunt quasi quod excepturi aspernatur repudiandae qui earum
          quos. Error dolorem quia, ab atque impedit inventore amet dolores
          minima quis totam eos, velit perferendis quam esse! Nam perferendis
          sed ut iusto officia ullam ea exercitationem tenetur dicta, quae iste
          doloribus omnis vero aut eaque velit dolor. Magni et voluptatem
          necessitatibus reprehenderit adipisci officia eveniet repudiandae
          deleniti vero fugiat aspernatur id cumque illum, consectetur voluptas?
          Ab fuga magnam, neque cum placeat ad repudiandae architecto iste est!
          Voluptates rerum, odio corporis non fugiat debitis iusto aperiam quos
          laudantium! Porro, corrupti facere necessitatibus, adipisci unde
          corporis est suscipit aut repellat eligendi ipsam quam sint nihil
          tenetur consequatur quia pariatur sit deserunt laboriosam at! Dolor
          commodi numquam laborum omnis aliquid repellat aliquam, aperiam vero a
          magni asperiores, consectetur nobis ex rerum doloremque nulla at optio
          facilis debitis cum illum nemo adipisci culpa consequatur. Cum velit
          rem quos maxime optio! Provident tenetur ducimus harum, doloremque
          quidem recusandae nobis temporibus illo odit placeat aperiam. Id ipsum
          neque aliquid consequuntur soluta reprehenderit laborum laboriosam
          qui, doloremque magni, nobis velit repellendus ipsa quos consequatur,
          ad nesciunt. Repudiandae dicta omnis odit ratione culpa sit dolorum
          neque architecto aliquid at. Aperiam laudantium beatae ipsam nemo
          molestiae!
        </Text>

        <View style={{ flexDirection: 'row', marginTop: 12, gap: 8 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              marginBottom: 32,
              backgroundColor: colors.primary500,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
            }}
            onPress={acceptTerms}
          >
            <Text
              style={{
                fontFamily: fonts.semiBold,
                fontSize: 14,
                color: colors.white,
              }}
            >
              Aceitar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              marginBottom: 32,
              backgroundColor: colors.secondary300,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
            }}
            onPress={declineTerms}
          >
            <Text
              style={{
                fontFamily: fonts.semiBold,
                fontSize: 14,
                color: colors.white,
              }}
            >
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primary700,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.secondary500,
  },
})
