import Button from "@material-ui/core/Button";
import gray from "@material-ui/core/colors/grey";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";

import i18n from "../../i18n";
import { maybe } from "../../misc";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "../ConfirmButton/ConfirmButton";

interface SaveButtonBarProps {
  disabled: boolean;
  state: ConfirmButtonTransitionState;
  labels?: {
    cancel?: string;
    delete?: string;
    save?: string;
  };
  onCancel: () => void;
  onDelete?: () => void;
  onSave(event: any);
}

const decorate = withStyles(theme => ({
  button: {
    marginRight: theme.spacing.unit
  },
  cancelButton: {
    marginRight: theme.spacing.unit * 2
  },
  deleteButton: {
    "&:hover": {
      backgroundColor: theme.palette.error.dark
    },
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
  },
  root: {
    borderTop: `1px ${gray[300]} solid`,
    display: "flex",
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing.unit
    }
  },
  spacer: {
    flex: "1"
  }
}));
export const SaveButtonBar = decorate<SaveButtonBarProps>(
  ({
    classes,
    disabled,
    labels,
    state,
    onCancel,
    onDelete,
    onSave,
    ...props
  }) => {
    return (
      <div className={classes.root} {...props}>
        {!!onDelete && (
          <Button
            variant="contained"
            onClick={onDelete}
            className={classes.deleteButton}
          >
            {labels && labels.delete ? labels.delete : i18n.t("Remove")}
          </Button>
        )}
        <div className={classes.spacer} />
        <Button
          className={classes.cancelButton}
          variant="flat"
          onClick={onCancel}
        >
          {labels && labels.cancel ? labels.cancel : i18n.t("Cancel")}
        </Button>
        <ConfirmButton
          disabled={disabled}
          onClick={onSave}
          transitionState={state}
        >
          {maybe(
            () => labels.save,
            i18n.t("Save", {
              context: "button"
            })
          )}
        </ConfirmButton>
      </div>
    );
  }
);
SaveButtonBar.displayName = "SaveButtonBar";
export default SaveButtonBar;
