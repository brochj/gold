import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import { recipeRequest } from '~/store/modules/recipe/actions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    minWidth: 200,
    // maxWidth: 900,
    // overflow: 'auto',
    flexDirection: 'column',
  },
  card: {
    marginBottom: 30,
  },
}));

export default function ShowRecipe({ match }) {
  const { id } = match.params;

  const classes = useStyles();
  const dispatch = useDispatch();

  const { recipe, sections } = useSelector(state => state.recipe.recipe);
  const { loading } = useSelector(state => state.recipe);

  console.tron.log(`recipe = ${JSON.stringify(recipe, 2, null)}`);

  useEffect(() => {
    if (!recipe.id) {
      dispatch(recipeRequest(id));
    }
  }, [dispatch, id, recipe]);

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <Grid
            direction="row"
            justify="center"
            alignItems="center"
            container
            spacing={3}
          >
            {/* <Grid item xs="auto" md={8} lg={9}> */}
            <Paper className={classes.paper} direction="row">
              <Typography>{loading && 'CARREGANDO'}</Typography>
              <Typography variant="h4">{recipe.name}</Typography>
              <Typography variant="button">{recipe.servings}</Typography>
              <Typography variant="button">
                {recipe.preparation_time}
              </Typography>
              <Typography variant="button">{recipe.difficulty}</Typography>
              {sections.map(section => (
                <>
                  <Typography variant="h6">{section.title}</Typography>
                  {section.steps.map(step => (
                    <>
                      <Typography variant="body1">{step.text}</Typography>
                      <Typography variant="caption" paragraph>
                        {step.tip}
                      </Typography>
                    </>
                  ))}
                </>
              ))}
            </Paper>
          </Grid>
        </Container>
        <Copyright />
      </main>
    </div>
  );
}
