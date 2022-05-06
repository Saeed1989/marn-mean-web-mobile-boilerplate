import React, {useEffect} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import * as Theme from '@/assets/styles';
import {NavUtils} from '@/utils';
import {getAllCategory} from '@/services';
import {Example} from '@/components';
import {CategoryHierarchyComponent} from '@/components';
import {
  UPDATE_CAT_LIST,
  UPDATE_ERROR,
  UPDATE_LOADING,
} from '@/constants/appActions';
import {AppContext} from '../../contexts/app';
import {AppProvider} from '../../contexts/app';
import {DalaListComponent} from '../../components/DataList/DalaListComponent';

const {navigateAndSimpleReset} = NavUtils;
export const HomeComponent = () => {
  const {Layout, Fonts} = Theme;

  const [state, dispatch] = React.useContext(AppContext);
  const {error, isLoading} = state;

  const setLoading = isLoading => {
    dispatch({
      type: UPDATE_LOADING,
      isLoading: isLoading,
    });
  };

  const reloadCatList = async () => {
    getAllCategory()
      .then(catList => {
        dispatch({
          type: UPDATE_CAT_LIST,
          categoryList: catList,
        });
      })
      .catch(err => {
        dispatch({
          type: UPDATE_ERROR,
          error: {
            msg: 'Something went wrong',
          },
        });
      });
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await reloadCatList();
      setLoading(false);
    };

    load();
  }, []);

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <CategoryHierarchyComponent />
      <DalaListComponent />
    </View>
  );
};

export const Home = () => {
  return (
    <>
      <AppProvider>
        <HomeComponent />
      </AppProvider>
    </>
  );
};
