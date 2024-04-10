import { css } from "@emotion/react";

export const globalStyles = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    min-height: 100dvh;
    overflow-x: hidden;
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings: "slnt" 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  main {
    height: 100dvh;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
