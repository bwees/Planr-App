import { StackedBarChart } from "react-native-chart-kit";
import React, { Component } from 'react';
import { View } from 'react-native';

export default class HomeScreenGraph extends Component {

    onPageLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        console.log("ON LAYOUT");
        this.state = [width, height];
    };

    render() {
        return (
            <View>
                {this.renderPager(this.state[0], this.state.height)}
            </View>
        );
    }

    renderPager = (width, height) => {
        // Do something if width or height are null
        // how can get root view's size here
        return (
            <StackedBarChart
                data={{
                    labels: ['MON', 'TUE'],
                    legend: [],
                    data: [[60], [30], [60], [30], [60]],
                    barColors: [colors.primary],
                }}
                width={width}
                height={height}
                yAxisSuffix="m"
                yAxisInterval={1} // optional, defaults to 1
                decimalPlaces={0}
                showLegend={false}
                chartConfig={{

                    backgroundColor: colors.tileColor,
                    backgroundGradientFrom: colors.tileColor,
                    backgroundGradientTo: colors.tileColor,
                    color: (opacity = 1) => `rgba(${colors.primaryRGB}, ${opacity})`,

                    barRadius: 8

                }}
            />
        );
    };
}