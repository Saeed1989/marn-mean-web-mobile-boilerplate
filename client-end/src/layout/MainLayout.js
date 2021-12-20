import React from "react";
import { Layout } from "antd";
import { Stack } from "react-bootstrap";
import { CatagoryHierarchyComponent } from "../components/CatagoryHierarchyComponent";
import { DalaListComponent } from "../components/DalaListComponent";
import { AppContext } from "../contexts/app";
import { useEffect } from "react";
import * as DATA_API from "../services/dataService";
import * as CAT_API from "../services/catagoryService";
import {
  UPDATE_CAT_LIST,
  UPDATE_DATA,
  UPDATE_ERROR,
  UPDATE_LOADING,
} from "../constants/appActions";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <Layout>
      {error ? error.msg : null}
      <Stack gap={4}>
        <div>
          <CatagoryHierarchyComponent />
        </div>
        <div>
          <DalaListComponent />
        </div>
      </Stack>
    </Layout>
  );
};
