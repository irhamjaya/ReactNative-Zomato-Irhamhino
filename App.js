import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native'
import { Button, Input, Item, Header, Container, CardItem, Content, Card, Left, Thumbnail, Body, Text, Icon, Right, List, ListItem } from 'native-base'
import axios from 'axios'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      resto: [],
      query: ''
    }
  }
  find() {
    var url=`https://developers.zomato.com/api/v2.1/search?q=${this.state.query}`
    var config={headers:{'user-key':'1719a350df2ee730df90814eeab82f72'}}
    axios.get(url,config)
    .then((ambilData)=>{this.setState({resto:ambilData.data.restaurants})})
  }
  render() {
    var dataResto = this.state.resto.map((val, i) => {
      var nama = val.restaurant.name
      var kota = val.restaurant.location.city
      var alamat = val.restaurant.location.address
      var harga = val.restaurant.average_cost_for_two
      var gambar = val.restaurant.thumb
      if (gambar==false) {pic='https://c-lj.gnst.jp/public/img/common/noimage.jpg?20190112050044'}
      return (
        <ListItem key={i}>
          <Content>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri:pic}}></Thumbnail>
                  <Body>
                    <Text>{nama}</Text>
                    <Text note>{kota}</Text>
                  </Body>
                </Left>
                <Right>
                  <Icon active name='calculator'></Icon>
                  <Text>Rp {harga}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Body>
                  <Image source={{uri:pic}} style={{height:250,width:'100%',flex:1}}></Image>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Icon name='navigate'></Icon>
                  <Text>{alamat}</Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </ListItem>
      )
    })
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="search" />
            <Input placeholder="Cari menu" onChangeText={(e)=>this.setState({query:e})}></Input>
          </Item>
        </Header>
        <Button full iconLeft primary onPress={()=>{this.find()}}>
          <Icon name='cake' />
          <Text>LIHAT DAFTAR RESTO</Text>
        </Button>
        <Content>
          <ScrollView>
          <List>
            {dataResto}
          </List>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}