import * as ReactRouter from 'react-router-dom'

export function Refresh() {
  const history = ReactRouter.useHistory();
  history.go(0);
  return null;
}
