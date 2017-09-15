import { system_ } from "../../helpers/assure";

export const CRoute = function (React, Route) {

  system_.notNull(arguments);

  return function (props) {

    const TheLayout = props.layout;
    const TheComponent = props.component;

    let props_ = filter(props);

    return <Route
      {...props_ }
      render={
        props => {

         // props_ = {...{...props, ...props_}}

          return (
            <TheLayout {...props_}>
              <TheComponent {...props_}/>
            </TheLayout>
          )
        }
      }
    />
  }
};

function filter(props) {
  return Object.keys(props)
    .filter(key => key !== "component" && key !== "layout")
    .reduce((acc, key) => ({ ...acc, [key]: props[key] }), {});
}