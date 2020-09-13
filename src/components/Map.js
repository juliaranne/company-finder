import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      showingInfoWindow: false,
    };
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
      })
    }
  };

  onInfoWindowClose = () => {
    this.setState({
      showingInfoWindow: false
    });
  }

  render() {
    return (
      <Map google={this.props.google} zoom={14} onClick={this.onMapClicked}>
        <Marker onClick={this.onMarkerClick} name={'Current location'} />
        <InfoWindow onClose={this.onInfoWindowClose} visible={this.state.showingInfoWindow}>
            <div>
              <h1>{'Berlin'}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyC_4SXHxINkcPGkC1Q1VHZY6z2WwtgPym4'
})(MapContainer)