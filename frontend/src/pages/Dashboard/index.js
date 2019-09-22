import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid, GridListTile, GridList } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import RecipeCard from '~/components/RecipeCard';

import { recipeRequest } from '~/store/modules/recipe/actions';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

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
    // overflow: 'auto',
    flexDirection: 'column',
  },
  card: {
    marginBottom: 30,
  },
  unstyledButton: {
    border: 'none',
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      const response = await api.get('/recipes');
      setRecipes(response.data);
    }

    getRecipes();
  }, []);

  function handleRecipeClick(id) {
    dispatch(recipeRequest(id));
  }

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
              <h1>Receitas</h1>
              <GridList cols={2}>
                {recipes.map(recipe => (
                  <GridListTile
                    key={String(recipe.id)}
                    className={classes.card}
                  >
                    <button
                      type="button"
                      className={classes.unstyledButton}
                      onClick={() => handleRecipeClick(recipe.id)}
                    >
                      {/* <Link to={`recipes/${recipe.id}`}> */}
                        <RecipeCard recipe={recipe} />
                      {/* </Link> */}
                    </button>
                  </GridListTile>
                ))}
              </GridList>
            </Paper>
            {/* </Grid> */}
          </Grid>
        </Container>
        {/* <Copyright /> */}
      </main>
    </div>
  );
}
