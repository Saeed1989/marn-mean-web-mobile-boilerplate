import React from "react";
import axios from "axios";
var MockAdapter = require("axios-mock-adapter");

// jest.mock('axios');
var mock = new MockAdapter(axios);

const setupFakeLocalStorage = (profile) => {
  const fakeLocalStorage = (function () {
    let store = {
      profile: profile, // JSON.stringify(user)
    };

    return {
      getItem: function (key) {
        return store[key] || null;
      },
      setItem: function (key, value) {
        store[key] = value.toString();
      },
    };
  })(profile);
  return fakeLocalStorage;
};

function findAndAssertElement(text, tag) {
  const linkElement = screen.getByText(text);
  return assertElement(linkElement, tag);
}

function assertElement(linkElement, tag) {
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toBeVisible();
  expect(linkElement.tagName).toBe(tag);
  return linkElement;
}
