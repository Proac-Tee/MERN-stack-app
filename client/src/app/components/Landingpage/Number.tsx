"use client";

import React, { FC, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";

interface INumber {
  end: number;
}

const Number: FC<INumber> = ({ end }) => {
  const [props, api] = useSpring(() => ({
    from: { number: 0 },
    number: end,
    delay: 200,
    config: { duration: 10000 },
  }));

  useEffect(() => {
    api.start({ reset: true, from: { number: 0 }, to: { number: end } });
  }, [end, api]);

  return <animated.div>{props.number.to((n) => n.toFixed(0))}</animated.div>;
};

export default Number;
