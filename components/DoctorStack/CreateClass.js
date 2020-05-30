import * as React from 'react';
import {Formik} from 'formik';
import UIInput from '../../UIComponents/UIInput';


import {Input,Button,Slider,Text} from 'react-native-elements'
import {  View, AsyncStorage} from 'react-native';
import UIButton from '../../UIComponents/UIButton';
import {ButtonGroup} from 'react-native-elements'
import {Picker} from '@react-native-community/picker';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { PUSH_CLASS_FUNC } from '../../redux/actions/actions';

const CreateClass = (props) => {
    const [state,setState] = React.useState(0);
    const buttons = ["Ist","IInd","IIIrd","IVth"];
    const dispatch = useDispatch();

    const postData = async(data) => {
        try{
            let token = await AsyncStorage.getItem('loginToken')
                await Axios.post("https://dbformongo.eu-gb.cf.appdomain.cloud/createClasses",{
                className:data.className,facultyName:data.facultyName,no_of_students:data.no_of_students,year:data.year,  selectBranch:data.selectBranch
               
            },{
                headers:{
                    "Auth-Token":token
                }
            }
           
            ).then((res)=>
            {   
                dispatch(PUSH_CLASS_FUNC(res.data))
            }
            
            
            )
            ;
           
        }
        catch(e){
            throw new Error(e);
        }
    } 

    let initialValues = {className:"",facultyName:"",no_of_students:0,year:0,  selectBranch:0};
    let branches = [
        {viewValue:'CSE',value:'cse'},
        {viewValue:'ECE',value:'ece'},
        {viewValue:'EEE',value:'eee'},
        {viewValue:'IT',value:'it'},
        {viewValue:'Mechanical',value:'mech'},
        {viewValue:'Civil',value:'civil'},
    ]

    const [branch, setBranch] = React.useState({
        branch: 0,
      });

      
    return(
      
       <Formik initialValues={initialValues} 
       
       onSubmit={
           (data)=>{
            
            postData(data);
          
           props.closeModal();
        }
        
        } 
       
       
                validate={values=>{
                    const errors={};  
                        if(values.className === ''){
                            errors.className = "Class Name is required"
                        }
                        else if(values.className.includes(' ')){
                            errors.className = "No spaces"
                        }

                        if(values.facultyName === ''){
                            errors.facultyName = "Faculty Name is required"
                        }
                        if(values.no_of_students <= 0){
                            errors.no_of_students ="Minimum one student is required."
                        }
                        return errors;
                    
                    }}
        >
           {
               ({values,isValid,touched,handleChange,handleBlur,setFieldValue,handleSubmit,errors})=>(
                    // <UIInput placeholder="ClassName" onChange={handleChange} onBlur={handleBlur}></UIInput>
                    <View style={{alignItems:"stretch",flex:1}}>
                 <Text
                    style={{textAlign: 'left',fontSize:16,fontWeight:"bold", marginLeft: 10, color: "rgba(48, 48, 48,0.5)"}}>
                    Register as{' '}
                    <Text style={{fontStyle: 'italic'}}>
                      (longpress to select)
                    </Text>
                  </Text>
                        <View style={{alignItems:"center",margin:10}}>
                        <View style={buttonStyles2.pickerStyles}>
                    
                                            <Picker
                                            
                                            style={{color:"rgba(48, 48, 48,0.7)",fontSize:23}}
                                                mode="dialog"
                                                placeholder="drone"
                                                selectedValue={branches[branch.branch].value}
                                                prompt="Be careful you cant change it again!"
                                                onValueChange={(itemValue, itemIndex) => {
                                                
                                                setFieldValue('selectBranch', itemIndex);
                                                setBranch({branch: itemIndex});
                                            
                                                }}
                                                
                                                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                                                onPress={event => {
                                                
                                                }}>
                                                    {
                                                        branches.map(item=>{
                                                            return <Picker.Item label={item.viewValue} value={item.value} />
                                                        })
                                                    }

{/*                                                 
                                                <Picker.Item label="ECE" value="ece" />
                                                <Picker.Item label="EEE" value="eee" />
                                                <Picker.Item label="EEE" value="eee" /> */}
                                            </Picker>
                        </View>
                        </View>

                        <Input label={"Class"} placeholder="ClassName" onChangeText={handleChange("className")} onBlur={handleBlur("className")} 
                        
                        errorMessage={errors.className && touched.className ? errors.className : ''} errorStyle={{color:"red"}}>

                        </Input>
                        <Text></Text>
                        <Input  label={"Assign Faculty"} placeholder="Faculty name" onChangeText={handleChange("facultyName")} onBlur={handleBlur("facultyName")} 
                        
                        errorMessage={errors.facultyName && touched.facultyName ? errors.facultyName : ''} errorStyle={{color:"red"}}>

                        </Input>

                        <View style={{marginTop:20}}>
                            <Text style={{marginLeft:10,fontSize:16}}>Year:</Text>
                            <ButtonGroup selectedButtonStyle={{backgroundColor:"#3671bf"}} selectedIndex={values.year} buttons={buttons} containerStyle={{width:300}} onPress={(selectedIndex)=>
                                setFieldValue('year',selectedIndex)
                            }>
                    
                            </ButtonGroup>

                         </View>
                        
                        <Slider  maximumValue={50} step={1} onValueChange={(value)=>setFieldValue("no_of_students",value)}  style={{marginTop:20,marginHorizontal:10}} thumbTintColor="#3671bf" maximumTrackTintColor="#3671bf" ></Slider>
                    
                        <Text style={{textAlign:"center"}}>No of Students in Class: {values.no_of_students}</Text>
                        <Button disabled={!isValid} title="ADD CLASSS" buttonStyle={buttonStyles2.buttonStyle} titleStyle={buttonStyles2.titleStyle} onPress={
                            ()=>{
                            handleSubmit();
                           
                            }

                        } ></Button>

                        
                    </View>

               )
           }
       </Formik>
 
    )
}

export default CreateClass;

const buttonStyles2 = {
    buttonStyle:{
        
            width:null,
            height:50,
            elevation:1,
            backgroundColor:"#3671bf",
            marginVertical:30,
            
    },

    titleStyle:{
        fontFamily:"Montserrat-SemiBold",
        fontSize:16,
        letterSpacing:1,
        color:"white"
    },

    pickerStyles: {
        width: 300,
        height: 50,
        backgroundColor: 'white',
        marginVertical: 5,
        borderWidth:1,
        borderColor:"rgba(48, 48, 48,0.4)",
        borderRadius:3,
        
      },
}