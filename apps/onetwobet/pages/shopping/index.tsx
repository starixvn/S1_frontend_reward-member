import Layout from '@apps/onetwobet/components/common/Layout'
import Wrapper from '@apps/onetwobet/components/common/Wrapper'
import { GiftSwiper, GiftTab } from '@apps/onetwobet/components/Shopping'
import Shopping from '@apps/onetwobet/components/Shopping/oldIndex'
import classNames from 'classnames'
import { useInView } from 'libs/core/src/lib/hooks/useInView'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const useNewVersion = true;
	const { i18n, t } = useTranslation()
  const [inViewRef, isInView] = useInView()

	return (
		<Wrapper authRequired={false}>
			<Layout>
{ useNewVersion ?  				<main
					className={classNames('shopping-page', {
						'other-layout': !(i18n.language === 'en'),
					})}
				>
					<GiftSwiper />
					<div className='products-group container-xxl'>
						<div className='row'>
            <GiftTab
							activeItem={{}}
						/>
            </div>
            <div ref={inViewRef} />
            <br />
					</div>
				</main> : <Shopping />}



			</Layout>
		</Wrapper>
	)
}

export default Index
