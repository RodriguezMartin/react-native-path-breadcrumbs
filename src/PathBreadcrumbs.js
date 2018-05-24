import React, { Component } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  ViewPropTypes,
  Text,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';

export default class PathBreadcrumbs extends Component{
  static propTypes = {
    rootTitle: PropTypes.string,
    path: PropTypes.string,
    onPressCrumb: PropTypes.func,
    separator: PropTypes.node,
    containerStyles: ViewPropTypes.style,
    separatorStyles: Text.propTypes.style,
    crumbStyles: ViewPropTypes.style
  }

  constructor(props){
    super(props);
    this.state = {
      items: [],
    };
    this.pressDisabled = props.onPressCrumb ? false : true;
    this.onPressCrumb = props.onPressCrumb ? props.onPressCrumb : ()=>{};
    this.separator = props.separator ? props.separator : '>';
  }

  static getDerivedStateFromProps(nextProps){
    let items = [];
    const path = nextProps.path ? nextProps.path : '';
    const crumbs = path.split('/').slice(1,-1);
    const len = crumbs.length;
    for(let i = len; i > 0; i--){
      items.unshift({
        key: i,
        path: '/'+ crumbs.join('/') +'/',
        name: crumbs.pop()
      });
    }
    items.unshift({
      key: 0,
      path: '/',
      name: nextProps.rootTitle ? nextProps.rootTitle : 'Root'
    });
    return {
      items: items
    }
  }
  
  render(){
    return (
      <ScrollView 
        style={[styles.scrollView, this.props.containerStyles]} 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        ref="scrollView"
        onContentSizeChange={()=>{
          this.refs.scrollView.scrollToEnd();
        }}
      >
        {this.state.items.map((item)=>{
          const isFirstItem = item.key == 0;
          const isLastItem = item.key == this.state.items.length - 1;
          return (
            <View key={item.key} style={styles.itemView}>
              {!isFirstItem ? <Text style={this.props.separatorStyles}>{this.separator}</Text> : null}
              <TouchableOpacity onPress={()=>{this.onPressCrumb(item.path)}} disabled={isLastItem || this.pressDisabled}>
                <View style={[styles.item, this.props.crumbStyles, isLastItem && styles.viewCurrent]}>
                  <Text style={[this.props.itemTextStyles, isLastItem && styles.textCurrent]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 5
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  item: {
    borderRadius: 5,
    padding: 6
  },
  viewCurrent: {
    marginRight: 15
  },
  textCurrent: {
    fontWeight: '600',
  }
});