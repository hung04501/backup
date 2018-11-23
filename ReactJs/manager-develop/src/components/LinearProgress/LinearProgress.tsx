import * as React from 'react';

import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

type CSSClasses = 'root';

const styles: StyleRulesCallback<CSSClasses> = (theme: Theme & Linode.Theme) => ({
  root: {},
});

interface Props extends LinearProgressProps {
}

type CombinedProps = Props & WithStyles<CSSClasses>;

const LinearProgressComponent: React.StatelessComponent<CombinedProps> = (props) => {
  const variant = typeof props.value === 'number' ? 'determinate' : 'indeterminate';
  const value = typeof props.value === 'number' ? props.value : 0;
  return (
    <div className={props.classes.root}>
      <LinearProgress
        {...props}
        value={value}
        variant={variant}
        data-qa-linear-progress
      />
    </div>
  );
};

const decorate = withStyles(styles, { withTheme: true });

export default decorate<Props>(LinearProgressComponent);
