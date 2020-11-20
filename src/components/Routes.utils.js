import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';

  return routeName;
};

export const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
