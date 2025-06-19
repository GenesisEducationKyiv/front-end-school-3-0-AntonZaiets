import { j as jsxRuntimeExports, T as TrackForm } from './TrackForm-aNiWFFDF.js';
import { QueryClient, QueryClientProvider } from './index-B35keSyw.js';
import './index-BNDLrXFc.js';
import './index-BNcAPA1_.js';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});
function TrackFormStory(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrackForm, { ...props, onSubmit: props.onSubmit ?? (() => {
  }) }) });
}

export { TrackFormStory };
//# sourceMappingURL=TrackFormStory-Da1Id3mY.js.map
