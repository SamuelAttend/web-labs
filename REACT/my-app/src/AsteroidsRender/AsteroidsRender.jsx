import { useContext } from "react";
import { AsteroidContext } from "../App.js";
import { CardContent } from "../CardContent/CardContent";
import {
  DESTROY_PAGE,
  IS_DANGEROUS,
  MAIN_PAGE,
} from "../NavigationManager/NavigarionManagerConst.js";
import { useLocation } from "react-router-dom";

export function AsteroidsRender() {
  const { state, dispatch } = useContext(AsteroidContext);
  const loc = useLocation().pathname;

  let asteroidsListShow = [];

  if (loc === MAIN_PAGE) {
    asteroidsListShow = [...state.asteroidsList];
  } else if (loc === DESTROY_PAGE) {
    asteroidsListShow = [...state.destroyList];
  }

  if (state.onlyDangerous) {
    asteroidsListShow = asteroidsListShow.filter(
      (i) => i.rating === IS_DANGEROUS
    );
  }

  return asteroidsListShow.map((i, k) => (
    <AsteroidContext.Provider key={k} value={{ state, dispatch }}>
      <CardContent element={i} />
    </AsteroidContext.Provider>
  ));
}
