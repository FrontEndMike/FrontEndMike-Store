import isEqual from "lodash/isEqual";
import { useMemo, useRef } from "react";

function useDeepMemo(value) {
  const ref = useRef();
  const signal = useRef(0);
  if (!isEqual(value, ref.current)) {
    ref.current = value;
    signal.current += 1;
  }
  return useMemo(() => ref.current, [signal.current]);
}

export default useDeepMemo;