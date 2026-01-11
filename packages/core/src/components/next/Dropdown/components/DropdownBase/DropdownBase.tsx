import React, { useRef } from "react";
import cx from "classnames";
import FieldLabel from "../../../../FieldLabel/FieldLabel";
import Text from "../../../../Text/Text";
import styles from "./DropdownBase.module.scss";
import { getTestId } from "../../../../../tests/test-ids-utils";
import { ComponentDefaultTestId, ComponentVibeId } from "../../../../../tests/constants";
import { useDropdownContext } from "../../context/DropdownContext";
import { type BaseListItemData } from "../../../../BaseListItem";
import Tooltip from "../../../../Tooltip/Tooltip";
import { LayerProvider } from "@vibe/layer";
import useMergeRef from "../../../../../hooks/useMergeRef";

interface DropdownBaseProps {
  dropdownRef: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
}

const DropdownBase = ({ dropdownRef, children }: DropdownBaseProps) => {
  const {
    label,
    required,
    getLabelProps,
    className,
    id,
    ariaLabel,
    "data-testid": dataTestIdFromContext,
    disabled,
    readOnly,
    error,
    isFocused,
    isOpen,
    helperText,
    dir,
    tooltipProps
  } = useDropdownContext<BaseListItemData>();

  const layerRef = useRef<HTMLDivElement>(null);
  const mergedDropdownRef = useMergeRef<HTMLDivElement>(dropdownRef, layerRef);

  const coreDropdownElement = (
    <div
      ref={mergedDropdownRef}
      className={cx(styles.wrapper, className, {
        [styles.disabled]: disabled,
        [styles.readOnly]: readOnly,
        [styles.error]: error,
        [styles.active]: isFocused || isOpen
      })}
      id={id}
      aria-label={ariaLabel}
      data-testid={dataTestIdFromContext || getTestId(ComponentDefaultTestId.DROPDOWN, id)}
      data-vibe={ComponentVibeId.DROPDOWN}
    >
      <LayerProvider layerRef={layerRef}>{children}</LayerProvider>
    </div>
  );

  return (
    <div dir={dir} className={styles.outerWrapper}>
      {label && <FieldLabel labelText={label} required={required} {...getLabelProps()} />}
      <Tooltip {...tooltipProps} content={tooltipProps?.content}>
        {coreDropdownElement}
      </Tooltip>
      {helperText && (
        <Text color={error ? "negative" : "secondary"} className={styles.helperText}>
          {helperText}
        </Text>
      )}
    </div>
  );
};

export default DropdownBase;
