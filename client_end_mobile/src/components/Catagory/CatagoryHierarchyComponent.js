import React from 'react';
import {AppContext} from '../../contexts/app';
import {ActivityIndicator, View, Text} from 'react-native';
import {UPDATE_DATA, UPDATE_SELECT_CAT_LIST} from '../../constants/appActions';
import {getSelectedCatList} from '../../utils/catHierarchy/catHierarchy';
import {ThemeColors as Colors, Layout, Sizes, Fonts} from '../../assets/styles';
//import {YesNoModal} from '../molecules/YesNoModal';

const CatagoryView = props => {
  const {cat, onSelect} = props;
  const onClick = () => {
    onSelect();
  };

  return (
    <>
      <Text style={[Layout.fill, Fonts.textCenter, Fonts.textSmall]}>
        {cat.catName}
      </Text>
    </>
  );
};

export const CatagoryHierarchyComponent = () => {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const CONFIRM_MESSAGE = 'Do you want to clear all?';

  const [state, dispatch] = React.useContext(AppContext);
  const {selctedCatList} = state;

  const confirmResultHandle = result => {
    console.log('result');
    setShowConfirmDialog(false);
    if (result) {
      clearAll();
    }
  };

  const onSelect = indx => {
    if (indx !== selctedCatList.length - 1) {
      const newSlectedCatList = selctedCatList.slice(0, indx + 1);
      console.log(newSlectedCatList);
      const selectedCat = selctedCatList[indx];

      dispatch({
        type: UPDATE_SELECT_CAT_LIST,
        selctedCatList: newSlectedCatList,
      });

      dispatch({
        type: UPDATE_DATA,
        dataList: getSelectedCatList(state.catagoryList, selectedCat.sku),
      });
    }
  };

  const clearAll = () => {
    dispatch({
      type: UPDATE_SELECT_CAT_LIST,
      selctedCatList: [],
    });

    dispatch({
      type: UPDATE_DATA,
      dataList: getSelectedCatList(state.catagoryList, ''),
    });
  };

  const onClearAll = () => {
    setShowConfirmDialog(true);
  };

  return (
    <View style={[Layout.row, Layout.rowHCenter]}>
      {selctedCatList.map((cat, indx) => (
        <CatagoryView key={indx} cat={cat} onSelect={() => onSelect(indx)} />
      ))}
    </View>
  );
};
