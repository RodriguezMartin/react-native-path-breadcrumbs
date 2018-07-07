# react-native-path-breadcrumbs
Breadcrumbs generator from a given folder path. React Native standalone component.

## Instalation
```
npm i react-native-path-breadcrumbs
``` 

## Usage
```js
// First import it
import  PathBreadcrumbs  from  'react-native-path-breadcrumbs';

// Then use it in your JSX
render(){
  return (
    <PathBreadcrumbs
      path="/Folder1/Folder2/Folder3/"
      onPressCrumb={(path)=>{console.log(path)}
    />
  );
}
```

## Props
|Prop|Type|Description|
|--|--|--|
|**`rootTitle`**|`String`|The title of the root crumb, representing the '/' path. Defaults to 'Root'.|
|**`path`**|`String`|The folder path you want to transform to breadcrumbs. You may want to use a property of the app state, that way the breadcrums will update automatically. Defaults to '/'.|
|**`onPressCrumb`**|`Function`|Called when a crumb is pressed, it passes the full path to get to that folder as a parameter. If no function is passed all the crumbs will act like static items.|
|**`separator`**|`Node`|Separator for the crumbs. You can use an Icon component. Defaults to the '>' string.|
|**`containerStyles`**|`Styles`|Additional styles for the ScrollView that contains all the crumbs.|
|**`separatorStyles`**|`Styles`|Additional styles for the Text component that wraps each separator.|
|**`crumbStyles`**|`Styles`|Additional styles for the View component wraping each crumb.|
