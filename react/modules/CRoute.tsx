import { system_ } from "../../helpers/assure";

export const CRoute = function (React, Route) {

  system_.notNull(arguments);

  return class b extends React.Component {

    render() {
      
      const TheComponent = this.props.component;
      const TheLayout = this.props.layout;

      const props_ = pick(this.props);

      return <Route {...props_ }
        render={(props) => {
          return <TheLayout {...props_}>
            <TheComponent {...props_} /></TheLayout>
        }}
      />
    }
  };

  function pick(props) {
    const props_ = Object.keys(props)
      .filter(key => key !== "component" && key !== "layout")
      .reduce((acc, key) => ({ ...acc, [key]: props[key] }), {});

    return props_;
  }
}