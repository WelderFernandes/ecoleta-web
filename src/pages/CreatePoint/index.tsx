import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import {LeafletMouseEvent} from 'leaflet';
import { ReactSVG } from 'react-svg'

import DropZone from '../../components/dropzone'

interface Item {
    id: number;
    name: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}


const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([])
    const [ ufs, setUfs ] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])

    const [initialPosition, setInitialPosition] = useState<[number,number]>([0,0])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })

    const [selectedUf, setSelectUf] = useState('o')
    const [selectedCity, setSelectedCity] = useState('o')
    const [selectedItem, setselectedItem] = useState<number[]>([])
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

    const [selectedFile, setselectedFile] = useState<File>()

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords
            
            setInitialPosition([latitude,longitude])
        })
    },[])

    useEffect(() => {
        api.get('items').then(response => {
           setItems(response.data);
           
        })
    }, []);
    
    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
    
            setUfs(ufInitials)
        })
    }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            return
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/distritos`)
            .then(response => {
                const cityNames = response.data.map(city => city.nome);
            setCities(cityNames)
        })
    }, [selectedUf])
    
    function HandleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value
        setSelectUf(uf)
    }

    function HandleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value
        setSelectedCity(city)
    }   
    
    function HandleMapCLick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {

        const {name,value} = event.target
        setFormData({ ...formData, [name]:value})
        
    }

    function hundleSelectedItem(id: number) {

        const alreadySelected = selectedItem.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItem.filter(item => item !== id)
        setselectedItem(filteredItems)

        } else {
        setselectedItem([ ...selectedItem,id])
            
        }

    }

   async function hundleSubmit(event: FormEvent) {
        event.preventDefault();
        
        console.log(selectedFile);

        const { name , email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItem;

        const data = new FormData();
        data.append('name',name);
        data.append('email',email);
        data.append('whatsapp',whatsapp);
        data.append('uf',uf);
        data.append('city',city);
        data.append('latitude',String(latitude));
        data.append('longitude',String(longitude));
        data.append('items',items.join(','));
        
        if(selectedFile){
            data.append('image', selectedFile);
        }


        await api.post('points', data)
        
       alert('Ponto de coleta criado')
       history.push('/');
    }
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft/>
                      Voltar para home
                </Link>
            </header>
            <form onSubmit={hundleSubmit}>
                <h1>Cadastro do <br /> ponto de coleta</h1>

                <DropZone onFileUpload={setselectedFile} />

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field-group">
                    <div className="field">
                        <label htmlFor="name">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="name">Whatsapp</label>
                        <input
                            type="text"
                            name="whatsapp"
                            id="whatsapp"
                            onChange={handleInputChange}
                                
                        />
                        </div>

                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    <Map center={initialPosition} zoom={14} onCLick={HandleMapCLick}>
                         <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition}/>
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf"> Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={HandleSelectedUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={HandleSelectedCity}
                            >
                                <option value="0">Selecione uma cidade</option>
                                 {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item => (
                            <li className={selectedItem.includes(item.id) ? 'selected' : ''}
                                key={item.id} onClick={() => hundleSelectedItem(item.id)}>
                            {/* <img src={item.image_url} alt={item.name} /> */}
                            <ReactSVG
                                    src={item.image_url}
                                    afterInjection={(error, svg) => {
                                        if (error) {
                                        console.error(error)
                                        return
                                        }
                                        console.log(svg)
                                    }}
                                    beforeInjection={svg => {
                                        svg.classList.add('svg-class-name')
                                    }}
                                    evalScripts="always"
                                    fallback={() => <span>Error!</span>}
                                    loading={() => <span>Loading</span>}
                                    renumerateIRIElements={false}
                                    wrapper="span"
                                    className="wrapper-class-name"
                                    onClick={() => {
                                        console.log('wrapper onClick')
                                    }}
                                    />
                            <span>{item.name}</span>
  
                        </li>
                        ))}

                    </ul>
                </fieldset>
                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    )
}

export default CreatePoint;