import React, { forwardRef } from "react";
import cx from "classnames";
import { camelCase } from "es-toolkit";
import { getStyle } from "../../helpers/typesciptCssModulesHelper";
import { getTestId } from "../../tests/test-ids-utils";
import { ComponentDefaultTestId, ComponentVibeId } from "../../tests/constants";
import { type ShtrudelProps } from "./Shtrudel.types";
import styles from "./Shtrudel.module.scss";

const Shtrudel = forwardRef<HTMLSpanElement, ShtrudelProps>(
  (
    {
      className,
      tone = "primary",
      size = "medium",
      variant = "soft",
      pulse = false,
      symbol = "@",
      children,
      id,
      "data-testid": dataTestId,
      ...rest
    },
    ref
  ) => {
    const toneClassName = getStyle(styles, camelCase(`tone-${tone}`));
    const sizeClassName = getStyle(styles, camelCase(`size-${size}`));
    const variantClassName = getStyle(styles, camelCase(`variant-${variant}`));

    return (
      <span
        {...rest}
        ref={ref}
        id={id}
        data-testid={dataTestId || getTestId(ComponentDefaultTestId.SHTRUDEL, id)}
        data-vibe={ComponentVibeId.SHTRUDEL}
        className={cx(
          styles.shtrudel,
          toneClassName,
          sizeClassName,
          variantClassName,
          {
            [styles.withPulse]: pulse
          },
          className
        )}
      >
        <span className={styles.symbol}>{symbol}</span>
        {children ? <span className={styles.label}>{children}</span> : null}
      </span>
    );
  }
);

export default Shtrudel;
