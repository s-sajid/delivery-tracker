import { View, Text } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";
import { Card, Divider, Icon } from "@rneui/themed";
import MapView, { Marker } from "react-native-maps";

type Props = {
  order: Order;
};

const DeliveryCard = ({ order }: Props) => {
  const tw = useTailwind();

  return (
    <Card
      containerStyle={[
        tw("rounded-lg my-2"),
        {
          padding: 0,
          paddingTop: 16,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          backgroundColor: "#59C1CC",
        },
      ]}
    >
      <View>
        <Icon name="box" type="entypo" color="white" size={50} />

        <View>
          <Text
            style={tw("text-xs text-center uppercase text-white font-bold")}
          >
            {order.carrier} - {order.trackingId}
          </Text>
          <Text style={tw("text-white text-center text-lg font-bold")}>
            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          <Divider color="white" />
        </View>

        <View style={tw("mx-auto pb-5")}>
          <Text style={tw(" text-base text-center text-white font-bold mt-5")}>
            Address
          </Text>
          <Text style={tw("text-sm text-center text-white")}>
            {order.Address}, {order.City}
          </Text>
          <Text style={tw("text-sm text-center text-white italic")}>
            Shipping Cost: ${order.shippingCost}
          </Text>
        </View>
      </View>

      <Divider color="white" />

      <View style={tw("p-5")}>
        {order.trackingItems.items.map((item) => (
          <View
            style={tw("flex-row justify-between items-center")}
            key={item.item_id}
          >
            <Text style={tw("text-sm text-white italic")}>{item.name}</Text>
            <Text style={tw("text-xl text-white")}>x {item.quantity}</Text>
          </View>
        ))}
      </View>

      <MapView
        style={[tw("w-full"), { height: 200 }]}
        initialRegion={{
          latitude: order.Lat,
          longitude: order.Lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {order.Lat && order.Lng && (
          <Marker
            coordinate={{
              latitude: order.Lat,
              longitude: order.Lng,
            }}
            title="Delivery Location"
            description={order.Address}
            identifier="origin"
          />
        )}
      </MapView>
    </Card>
  );
};

export default DeliveryCard;
