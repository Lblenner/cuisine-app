import React from 'react';
import { StyleSheet, View, TextInput, Picker, Text, TouchableOpacity } from 'react-native';


class Screen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            inpitcl: '0',
            inputg: '0',
            etat: 'g',
            type: 'farine'
        }
    }



    produitEnCroix = (quantite, valeurMultiplieeGramme, valeurDiviseeGramme, uniteInitiale) => {
        let quantiteCalculee;
        if (uniteInitiale === 'g') {
            quantiteCalculee = quantite * valeurMultiplieeGramme / valeurDiviseeGramme;
        } else { // unite === 'cL'
            // Produit en croix avec deux unités cL et g =>
            // valeurMultiplieeCentilitres = valeurDiviseeGramme
            quantiteCalculee = quantite * valeurDiviseeGramme / valeurMultiplieeGramme;
        }
        return quantiteCalculee;
    }

    conversion = (quantite, matierePremiere, uniteInitiale) => {
        let quantiteRenvoye;
        switch (matierePremiere) {
            case 'farine':
                quantiteRenvoye = this.produitEnCroix(quantite, 20, 100, uniteInitiale); // 100 g de farine équivaut à 20 cL
                break;
            case 'sucre':
                quantiteRenvoye = this.produitEnCroix(quantite, 10, 80, uniteInitiale); // 80 g de sucre équivaut à 10 cL
                break;
        }
        return quantiteRenvoye;
    }

    focusg = () => {
        this.setState({ inputg: '', etat: 'g' })
    }

    focuscl = () => {
        this.setState({ inputcl: '', etat: 'cl' })
    }

    valcl = () => {
        if (this.state.etat == 'cl') {
            return this.state.inputcl
        } else {
            var valo = this.conversion(parseInt(this.state.inputg), this.state.type, 'g')
            return valo.toString()
        }
    }

    valg = () => {
        if (this.state.etat == 'g') {
            return this.state.inputg
        } else {
            var valo = this.conversion(parseInt(this.state.inputcl), this.state.type, 'cl')
            return valo.toString()
        }
    }


    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.titre}>Turbo Convertisseur de chez Martine</Text>
                <View style={{ flex: 2 }}></View>
                <View style={styles.champs}>
                    <View style={styles.pickerstyle}>
                        <Picker
                            selectedValue={this.state.type}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => this.setState({ type: itemValue })}
                        >
                            <Picker.Item label="Farine" value="farine" />
                            <Picker.Item label="Sucre" value="sucre" />
                        </Picker>
                    </View>
                </View>
                <View>
                    <View style={styles.row}>
                        <TextInput style={styles.input}
                            autoCorrect={false}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ inputg: text })}
                            value={this.valg()}
                            onFocus={this.focusg}
                        />
                        <Text style={styles.unite}>g</Text>
                    </View>
                    <View style={styles.row}>
                        <TextInput style={styles.input}
                            autoCorrect={false}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ inputcl: text })}
                            value={this.valcl()}
                            onFocus={this.focuscl}
                        />
                        <Text style= {styles.unite}>cL</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        flex:1 ,
        margin: 5,
        fontSize: 25
    },
    titre: {
        textAlign: 'center',
        fontSize: 35,
        margin: 5,
        color: '#8d633e'
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffdc'
    },
    picker: {
        width: 150,
    },
    pickerstyle: {
        borderRadius: 5, 
        backgroundColor: '#fdf1b8'
    },
    champs: {
        marginBottom: 20,
        alignItems: 'center'
    },
    row: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#fdf1b8',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    unite: {
        marginRight: 10,
        fontSize: 25
    }
})

export default Screen