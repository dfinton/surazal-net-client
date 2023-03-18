import { observer } from 'mobx-react';

import { useRouter } from 'next/router';
import { useStore } from '@/components/store/store-provider';
import FractalImageComponent from '@/components/fractal/image';
import FooterComponent from '@/components/layout/footer';
import HeaderComponent from '@/components/layout/header';
import CmsFractalStore from '@/store/cms-fractal';

const FractalImageView = function() {
  const { cmsFractalStore } = useStore();
  const router = useRouter();
  const id = router.query.id;
  const fractal = cmsFractalStore.fractal[id];

  return (
    <div className="app">
      <HeaderComponent />
      <div className="body">
        <FractalImageComponent fractal={fractal} />
      </div>
      <FooterComponent />
    </div>
  );
}

export default observer(FractalImageView);

export async function getServerSideProps(context) {
  const cmsFractalStore = new CmsFractalStore();
  const id = context.query.id;

  await cmsFractalStore.fetchFractal({
    id,
  });

  const {
    fractal,
  } = cmsFractalStore;

  const props = {
    initialState: {
      cmsFractalStore: {
        fractal,
      },
    },
  };

  return { props };
}
