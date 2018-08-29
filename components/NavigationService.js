import { NavigationActions } from "react-navigation";
import { StackActions } from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

const popAction = StackActions.pop({
  n: 1
});

const replaceAction = StackActions.replace({
    routeName: 'login'
});

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function top() {
  _navigator.dispatch(replaceAction);
}

function pop() {
  _navigator.dispatch(popAction);
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  top,
  pop
};
