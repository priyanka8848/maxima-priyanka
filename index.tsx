import type { NextPage } from 'next';
import { CONSTANTS } from '../services/config/app-config';
import MetaTag from '../services/api/general_apis/meta-tag-api';
import HomePage from '../components/HomePage';
import Header from '../components/PageMetaData/PageMetaData';
import { getMultiCurrencyValue } from '../services/api/general_apis/default-currency-api';
import MultiLangApi from '../services/api/general_apis/multilanguage-api';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultCurrencyValue } from '../store/slices/general_slices/multi-currency-slice';
import { setMultiLingualData } from '../store/slices/general_slices/multilang-slice';
import { setRevalidationTime } from '../store/slices/general_slices/cache-slice';
import { askForPermissionToReceiveNotifications } from '../push-notifications';

const Home: NextPage = (fetchedDataFromServer: any) => {
  askForPermissionToReceiveNotifications();
  console.log('check data of server obj', fetchedDataFromServer);
  const dispatch = useDispatch();
  const getCurrentTimestamp = Date.now();
  dispatch(setRevalidationTime(getCurrentTimestamp));
  dispatch(setDefaultCurrencyValue(fetchedDataFromServer?.defaultCurrencyValue));
  dispatch(setMultiLingualData(fetchedDataFromServer?.multiLingualValues));

  return (
    <>
      {CONSTANTS.ENABLE_META_TAGS && <Header meta_data={fetchedDataFromServer?.metaTagsDataFromAPI} />}
      <div>
        <HomePage default_currency_value={fetchedDataFromServer?.defaultCurrencyValue} multi_lingual_values={fetchedDataFromServer?.multiLingualValues} />
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  let fetchedDataFromServer: any = {};
  const method = 'get_meta_tags';
  const version = 'v1';
  const entity = 'seo';
  const params = `?version=${version}&method=${method}&entity=${entity}`;
  const url = `${context.resolvedUrl.split('?')[0]}`;

  if (CONSTANTS.ENABLE_META_TAGS) {
    let meta_data: any = await MetaTag(`${CONSTANTS.API_BASE_URL}${CONSTANTS.API_MANDATE_PARAMS}${params}&page_name=${url}`);
    if (meta_data?.status === 200 && Object.keys(meta_data).length > 0) {
      fetchedDataFromServer.metaTagsDataFromAPI = meta_data?.data?.message?.data;
    } else {
      fetchedDataFromServer = {};
    }
  }
  let get_default_currency_value: any = await getMultiCurrencyValue();
  if (get_default_currency_value?.status === 200) {
    fetchedDataFromServer.defaultCurrencyValue = get_default_currency_value?.data?.message;
  } else {
    fetchedDataFromServer.defaultCurrencyValue = {};
  }
  let get_multi_lingual_data_value: any = await MultiLangApi();
  if (get_multi_lingual_data_value?.length > 0) {
    fetchedDataFromServer.multiLingualValues = get_multi_lingual_data_value;
  } else {
    fetchedDataFromServer.multiLingualValues = [];
  }
  return { props: fetchedDataFromServer };
}

export default Home;
