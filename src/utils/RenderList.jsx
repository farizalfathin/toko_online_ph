import { Children } from "react";

export default function RenderList({ of, isLoading, loadingElement, render }) {
  if (isLoading) {
    return loadingElement;
  }

  return Children.toArray(of.map((item, index) => render(item, index)));
}
