import PropTypes from 'prop-types';
import React, { PureComponent, Children } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Animated,
  Platform,
  ViewPropTypes,
  Dimensions
} from 'react-native';

// import Indicator from '../indicator';
import styles from './styles';

const floatEpsilon = Math.pow(2, -23);

function equal(a, b) {
  return Math.abs(a - b) <= floatEpsilon * Math.max(Math.abs(a), Math.abs(b));
}

export default class Pages extends PureComponent {
  static defaultProps = {
    pagingEnabled: true,
    nestedScrollEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    scrollEventThrottle: 25,
    scrollsToTop: false,

    indicatorColor: 'rgb(255, 255, 255)',
    indicatorOpacity: 0.3,

    startPage: 0,

    horizontal: true,
    rtl: false,
  };

  static propTypes = {
    style: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,

    indicatorColor: PropTypes.string,
    indicatorOpacity: PropTypes.number,
    indicatorPosition: PropTypes.oneOf([
      'none',
      'top',
      'right',
      'bottom',
      'left',
    ]),

    startPage: PropTypes.number,
    progress: PropTypes.instanceOf(Animated.Value),

    horizontal: PropTypes.bool,
    rtl: PropTypes.bool,

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),

    onLayout: PropTypes.func,
    onScrollStart: PropTypes.func,
    onScrollEnd: PropTypes.func,
    onHalfway: PropTypes.func,

    renderPager: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onScrollBeginDrag = this.onScrollBeginDrag.bind(this);
    this.onScrollEndDrag = this.onScrollEndDrag.bind(this);

    this.scrollRef = React.createRef();

    const { startPage, progress = new Animated.Value(startPage) } = this.props;

    this.progress = startPage;
    this.mounted = false;
    this.scrollState = -1;
    this.activeIndex = startPage;

    this.state = {
      layout: false,
      width: 0,
      height: 0,
      progress,
      x: 0,
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentDidUpdate() {
    if (this.scrollState === -1) {
      /* Fix scroll position after layout update */
      requestAnimationFrame(() => {
        this.scrollToPage(Math.floor(this.progress), false);
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLayout(event) {
    const { width, height } = event.nativeEvent.layout;
    const { onLayout } = this.props;

    if (typeof onLayout === 'function') {
      onLayout(event);
    }

    this.setState({ width, height, layout: true });
  }

  onScroll(event) {
    if (this.scrollState === -1) {
      return;
    }

    const { horizontal } = this.props;
    const {
      [horizontal ? 'x' : 'y']: offset,
    } = event.nativeEvent.contentOffset;
    const what = Math.round(parseFloat(event.nativeEvent.contentOffset.x / Dimensions.get('window').width));
    this.setState({ x: what })
    const { [horizontal ? 'width' : 'height']: base, progress } = this.state;
    progress.setValue((this.progress = base ? offset / base : 0));

    const discreteProgress = Math.round(this.progress);

    if (this.activeIndex !== discreteProgress) {
      this.onHalfway(discreteProgress);
    }

    if (this.scrollState === 1 && equal(discreteProgress, this.progress)) {
      this.onScrollEnd();

      this.scrollState = -1;
    }
  }

  onScrollBeginDrag() {
    const { onScrollStart } = this.props;

    if (typeof onScrollStart === 'function') {
      onScrollStart(Math.round(this.progress));
    }

    this.scrollState = 0;
  }

  onScrollEndDrag() {
    const { horizontal } = this.props;

    /* Vertical pagination is not working on android, scroll by hands */
    if (Platform.OS === 'android' && !horizontal) {
      this.scrollToPage(Math.round(this.progress));
    }

    this.scrollState = 1;
  }

  onScrollEnd() {
    const { onScrollEnd } = this.props;

    if (typeof onScrollEnd === 'function') {
      onScrollEnd(Math.round(this.progress));
    }
  }

  onHalfway(nextIndex) {
    const { onHalfway } = this.props;

    if (typeof onHalfway === 'function' && nextIndex >= 0) {
      onHalfway(nextIndex, this.activeIndex);
    }

    this.activeIndex = nextIndex;
  }

  scrollToPage(page, animated = true) {
    const { horizontal } = this.props;
    const { [horizontal ? 'width' : 'height']: base } = this.state;
    const { current: scroll } = this.scrollRef;

    if (animated) {
      this.scrollState = 1;
    }

    if (this.mounted && scroll) {
      scroll.scrollTo({
        [horizontal ? 'x' : 'y']: page * base,
        animated,
      });
    }
  }

  getPage() {
    return this.state.x
  }

  isDragging() {
    return this.scrollState === 0;
  }

  isDecelerating() {
    return this.scrollState === 1;
  }

  renderPage(page, index) {
    let { width, height, progress } = this.state;
    const { children, horizontal, rtl } = this.props;

    const pages = Children.count(children);

    const pageStyle = horizontal && rtl ? styles.rtl : null;

    /* Adjust progress by page index */
    progress = Animated.add(progress, -index);

    const props = {
      index,
      pages,
      progress,
      collapsable: false,
    };

    return (
      <View style={[{ width, height }, pageStyle]}>
        {React.cloneElement(page, props)}
      </View>
    );
  }

  renderPager(pager) {
    const { renderPager, horizontal, rtl } = this.props;

    if (typeof renderPager === 'function') {
      return renderPager({ horizontal, rtl, ...pager });
    }

    const { indicatorPosition } = pager;

    if (indicatorPosition === 'none') {
      return null;
    }

    const indicatorStyle = horizontal && rtl ? styles.rtl : null;

    const style = [styles[indicatorPosition], indicatorStyle];

    return (
      <SafeAreaView style={style} pointerEvents="none">
        {/* <Indicator {...pager} /> */}
      </SafeAreaView>
    );
  }

  renderPages(props) {
    const { horizontal, rtl, style, children } = this.props;
    const { [horizontal ? 'width' : 'height']: base, layout } = this.state;

    if (!layout) {
      return null;
    }

    const scrollStyle = horizontal && rtl ? styles.rtl : null;

    const contentOffset = {
      [horizontal ? 'x' : 'y']: base * Math.floor(this.progress),
      [horizontal ? 'y' : 'x']: 0,
    };

    return (
      <ScrollView
        {...props}
        style={[styles.container, style, scrollStyle]}
        onScroll={this.onScroll}
        onScrollBeginDrag={this.onScrollBeginDrag}
        onScrollEndDrag={this.onScrollEndDrag}
        contentOffset={contentOffset}
        ref={this.scrollRef}
      >
        {Children.map(children, this.renderPage, this)}
      </ScrollView>
    );
  }

  render() {
    const { progress } = this.state;
    const { horizontal } = this.props;
    const {
      style,
      containerStyle,
      children,
      indicatorColor,
      indicatorOpacity,
      indicatorPosition = horizontal ? 'bottom' : 'right',
      ...props
    } = this.props;

    const pages = Children.count(children);

    const Pager = () =>
      this.renderPager({
        pages,
        progress,
        indicatorColor,
        indicatorOpacity,
        indicatorPosition,
      });

    return (
      <View style={[styles.container, containerStyle]} onLayout={this.onLayout}>
        {this.renderPages(props)}

        <Pager />
      </View>
    );
  }
}
