import { system_ } from "../../helpers/assure";

export function CRoute(React, Route) {

  system_.notNull(arguments);

  return class cRoute extends Route {

    render() {

      const props = this.props;
      const path = props.location.pathname;

      if (path.indexOf("..") > -1) {
        throw new Error("path must not include double dots.")
      }

      if (path.indexOf("/") !== 0) {
        throw new Error("path must have leading slash.")
      }

      const Lay = props.layout;
      const Comp = props.component;

      if (Lay) {
        return <Lay>
          {Comp ? <Comp {...props} /> : super.render()}
        </Lay>
      }
      return super.render();

    }

  }
};

