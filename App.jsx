import { useState } from 'react';
import { ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { PaperProvider, Card, MD3DarkTheme, MD3LightTheme, Portal, FAB, Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function Screen1({ navigation }) {
	const images = [
		'https://fastly.picsum.photos/id/62/700/700.jpg?hmac=P72jJd2OrDRQ_CvoISD7jJzOS1SIoqDmWoG--JySNv4',
		'https://fastly.picsum.photos/id/684/700/700.jpg?hmac=C2gOfLy0BluSdJpZ2KqwV3ARwAsCFcDpF6Jk9J0JHxo',
	];

	return (
		<ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
			{images.map(image =>
				<Card key={image} style={{ margin: 8 }} onPress={() => navigation.navigate('Screen2', image)}>
					<Card.Cover source={{ uri: image }} />
				</Card>
			)}
		</ScrollView>
	);
}

function Screen2({ navigation, route }) {
	return (
		<ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
			<Card style={{ margin: 8 }}>
				<Card.Cover source={{ uri: route.params }} />
				<Card.Actions>
					<Button onPress={() => navigation.goBack()}>Go back</Button>
				</Card.Actions>
			</Card>
		</ScrollView>
	)
}

export default function App() {
	const [icon, setIcon] = useState('plus');
	const dark = useColorScheme() == 'dark';
	const theme = dark ? MD3DarkTheme : MD3LightTheme;

	const navigated = (state) => {
		switch (state.routes[state.index].name) {
			case 'Screen1':
				setIcon('plus');
				break;
			case 'Screen2':
				setIcon('pencil');
				break;
		}
	}

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer theme={theme} onStateChange={navigated}>
				<Stack.Navigator screenOptions={{ gestureEnabled: true }}>
					<Stack.Screen name="Screen1" component={Screen1} />
					<Stack.Screen name="Screen2" component={Screen2} />
				</Stack.Navigator>
			</NavigationContainer>
			<Portal>
				<FAB icon={icon} style={[styles.fab, { bottom: 50, right: 50 }]} />
			</Portal>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		alignSelf: 'center',
	},
});
