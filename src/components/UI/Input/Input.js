import React from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import color from "../../../sass/settings/_settings.colors.scss";

const styles = {
  shrinked: {
    transform: "translate(0, -10px) scale(1) !important",
    fontWeight: "600",
    color: "#272727"
  }
};

const Input = props => {
  const { classes } = props;
  // icon inside the input is called adornment. Can be set on the end or on the start
  const adornment = () => {
    if (props.config.adornment) {
      const side =
        props.config.adornment.position === "end"
          ? "endAdornment"
          : "startAdornment";
      return {
        [side]: props.config.adornment.icon()
      };
    }
  };

  // JSX for character counter, appearing in helperText label if specified in the config on input as charCount
  const CharCounter = () => {
    if (props.config.charCounter) {
      const limit = props.config.charCounter;
      const style = {
        position: "absolute",
        top: 0,
        right: 0,
        color: props.config.value
          ? props.config.value.length > limit
            ? color.red
            : color.grey
          : color.grey
      };
      return (
        <span style={style}>{`${
          props.config.value ? props.config.value.length : 0
        }/${limit}`}</span>
      );
    }
    return "";
  };

  const selectDisplayRender = props.renderVal
    ? { renderValue: () => props.renderVal }
    : props.config.value
    ? {}
    : {
        renderValue: val => (
          <span style={{ color: color.grey }}>
            {props.config.placeholderStatic}
          </span>
        )
      };

  return (
    <TextField
      {...props}
      id={props.config.id}
      name={props.config.id}
      type={props.config.type}
      label={props.config.placeholder}
      placeholder={props.config.placeholderStatic}
      select={props.config.select}
      fullWidth={true}
      multiline={props.config.type === "textarea"}
      // keep helper text height fixed by always providing the value, so there won't be movment in the DOM on error msg on/off
      helperText={[
        props.config.error || props.config.infolabel || " ",
        CharCounter()
      ]}
      value={props.config.value || ""}
      // if it's a group of inputs highlight all of them on error
      error={Boolean(props.config.error || props.config.groupError)}
      margin="normal"
      variant="outlined"
      FormHelperTextProps={{
        style: {
          position: "relative",
          margin: "4px",
          backgroundColor: "transparent",
          whiteSpace: props.config.group ? "nowrap" : "normal",
          marginBottom: props.config.infolabel ? "14px" : "4px",
          // add padding if there is CharCounter included in the config
          paddingRight: props.config.charCounter ? "40px" : 0
        }
      }}
      InputProps={{
        labelWidth: 0,
        margin: "dense",
        ...adornment(),
        style:
          props.config.type === "textarea"
            ? {
                paddingTop: "4px",
                paddingBottom: "4px",
                backgroundColor: "#fff"
              } // textarea input padding
            : {
                paddingRight: 0 // other inputs padding
              },
        inputProps: {
          rows: 4,
          autoComplete: "new-password",
          style: {
            paddingTop: "10px",
            paddingBottom: "10px"
          }
        }
      }}
      InputLabelProps={{
        classes: {
          shrink: classes.shrinked,
          outlined: classes.outlined
        },
        shrink: props.config.shrink,
        style: {
          whiteSpace: props.config.group ? "nowrap" : "normal",
          top: "-0.78rem"
        }
      }}
      // if we pass select flag in the config Input transforms to Select using these props
      SelectProps={{
        ...props,
        displayEmpty: true,
        // use native for long lists, much better preformance
        native: props.config.native,
        value: props.config.value,
        ...selectDisplayRender,
        style: {
          minHeight: 0,
          padding: 0,
          backgroundColor: "#fff"
        },
        SelectDisplayProps: {
          style: {
            paddingTop: "10px",
            paddingBottom: "10px"
          }
        },
        MenuProps: {
          style: {
            display:
              props.config.selectList && props.config.selectList.length
                ? "block"
                : "none",
            marginTop: "3.5rem",
            maxHeight: "400px"
          },
          transitionDuration: 200,
          BackdropProps: {
            style: {
              backgroundColor: "transparent"
            },
            onWheel: e => e.target.click()
          }
        }
      }}
    >
      {/* if config.select is true itterate through a provided list */
      props.config.select
        ? props.config.selectList.map((item, index) =>
            // if type of select is native we have to use <option> tag
            props.config.native ? (
              <option key={item.value + item.label} value={item.value}>
                {item.label}
              </option>
            ) : (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            )
          )
        : null}
    </TextField>
  );
};

export default withStyles(styles)(Input);
