import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
const MARGIN = 16;
const DEFAULT_POST_HEIGHT = 100
let POST_HEIGHT = DEFAULT_POST_HEIGHT + MARGIN * 2;
const wHeight = Dimensions.get("window").height;
const height = wHeight - 64;
const styles = StyleSheet.create({
    post: {
        marginVertical: MARGIN,
        alignSelf: "center",
    },
});
console.disableYellowBox = true

const AnimatePost = ({ y, item }) => {

    let index = item.index
    const position = Animated.subtract(index * POST_HEIGHT, y);
    const isDisappearing = -POST_HEIGHT;
    const isTop = 0;
    const isBottom = height - POST_HEIGHT;
    const isAppearing = height;
    const translateY = Animated.add(
        Animated.add(
            y,
            y.interpolate({
                inputRange: [0, + index * POST_HEIGHT],
                outputRange: [1, 1.28 * -index * POST_HEIGHT],
                extrapolateRight: "clamp",
            })
        ),
        position.interpolate({
            inputRange: [isBottom, isAppearing],
            outputRange: [0, -POST_HEIGHT / 2],
            extrapolate: "clamp",
        })
    );
    let varA = .95
    const scale = position.interpolate({
        inputRange: [isDisappearing * varA, isTop * varA, isBottom * varA, isAppearing * varA],
        outputRange: [0.25, 1, 1, 0.25],
        extrapolate: "clamp",
    });
    const opacity = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.1, 1, 1, 0.9],
    });
    return (
        <Animated.View
            style={[styles.post, { opacity, transform: [{ translateY }, { scale }] }]}
            key={index}
        >
        </Animated.View>
    );
};

export default AnimatePost;