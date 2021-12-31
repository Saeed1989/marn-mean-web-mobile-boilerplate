import React from 'react';
import {
  UPDATE_DATA,
  UPDATE_ERROR,
  UPDATE_SELECT_CAT_LIST,
} from '../../constants/appActions';
import {AppContext} from '../../contexts/app';
import {
  getCatHierarchy,
  getSelectedCatList,
} from '../../utils/catHierarchy/catHierarchy';
import {getData} from '@/services';
import {ThemeColors as Colors, Layout, Sizes, Fonts} from '../../assets/styles';
import {ActivityIndicator, View, Text} from 'react-native';

export const DataView = props => {
  const {data, onSelect} = props;

  const onClick = () => {
    onSelect(data);
  };

  return (
    <>
      <Text style={[Layout.fill, Fonts.textCenter, Fonts.textSmall]}>
        {data.name || data.catName}
      </Text>
    </>
  );
};

export const DalaListComponent = () => {
  const [state, dispatch] = React.useContext(AppContext);
  const {dataList} = state;

  const onSelect = data => {
    if (data.catName) {
      const newSelectedCataList = [...state.selctedCatList, data];
      dispatch({
        type: UPDATE_SELECT_CAT_LIST,
        selctedCatList: newSelectedCataList,
      });
      const dataList = getSelectedCatList(state.catagoryList, data.sku);
      if (dataList && dataList.length > 0) {
        dispatch({
          type: UPDATE_DATA,
          dataList: dataList,
        });
      } else {
        reloadData(newSelectedCataList);
      }
    } else {
      alert(data.name);
    }
  };

  const reloadData = async catagoryList => {
    console.log(catagoryList);
    getData(getCatHierarchy(catagoryList))
      .then(dataList => {
        dispatch({
          type: UPDATE_DATA,
          dataList: dataList,
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

  return (
    <View style={[Layout.row, Layout.rowHCenter]}>
      {dataList.map((data, indx) => (
        <DataView key={indx} onSelect={onSelect} data={data} />
      ))}
    </View>
  );
};
