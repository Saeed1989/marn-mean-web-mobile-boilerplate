import React from "react";
import { CatagoryHierarchyComponent } from "../components/organisms/CatagoryHierarchyComponent";
import { DalaListComponent } from "../components/organisms/DalaListComponent";
import { AppContext } from "../contexts/app";
import { useEffect } from "react";
import * as CAT_API from "../services/catagoryService";
import {
  UPDATE_CAT_LIST,
  UPDATE_ERROR,
  UPDATE_LOADING,
} from "../constants/appActions";

export const MainLayout = () => {
  const [state, dispatch] = React.useContext(AppContext);
  const { error, isLoading } = state;

  const setLoading = (isLoading) => {
    dispatch({
      type: UPDATE_LOADING,
      isLoading: isLoading,
    });
  };

  const reloadCatList = async () => {
    CAT_API.getAllCatagory()
      .then((catList) => {
        dispatch({
          type: UPDATE_CAT_LIST,
          catagoryList: catList,
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
    <div className="container-fluid mt-10">
      {error ? error.msg : null}
      <div className="row">
        <CatagoryHierarchyComponent />
      </div>
      <div className="row">
        <DalaListComponent />
      </div>
      {isLoading ? (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : null}
    </div>
  );
};
