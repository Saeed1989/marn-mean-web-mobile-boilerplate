import React from "react";
import { CategoryHierarchyComponent } from "../components/organisms/CategoryHierarchyComponent";
import { DataListComponent } from "../components/organisms/DataListComponent";
import { AppContext } from "../contexts/app";
import { useEffect } from "react";
import * as CAT_API from "../services/categoryService";
import {
  UPDATE_CAT_LIST,
  UPDATE_ERROR,
  UPDATE_LOADING,
} from "../constants/appActions";

export const Main = () => {
  const [state, dispatch] = React.useContext(AppContext);
  const { error, isLoading } = state;

  const setLoading = (isLoading) => {
    dispatch({
      type: UPDATE_LOADING,
      isLoading: isLoading,
    });
  };

  const reloadCatList = async () => {
    CAT_API.getAllCategory()
      .then((catList) => {
        dispatch({
          type: UPDATE_CAT_LIST,
          categoryList: catList,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_ERROR,
          error: {
            msg: "Something went wrong",
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
    <div className="container mt-10">
      {error ? error.msg : null}
      <div className="row">
        <CategoryHierarchyComponent />
      </div>
      <div className="row">
        <DataListComponent />
      </div>
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : null}
    </div>
  );
};
