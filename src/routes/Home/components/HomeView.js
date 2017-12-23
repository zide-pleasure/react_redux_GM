import React, {Component} from 'react'
// import PropTypes from 'prop-types'
// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'
// import _ from 'lodash'
//
// import createG2 from 'g2-react'
// // import {Stat} from 'g2'
// import data from '../modules/data.json'
//
// import {Editor} from 'react-draft-wysiwyg'
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
//
// import {Row, Col, Card, Table, Popconfirm, Modal, Form, Input, Radio, Button, InputNumber, message} from 'antd'
//
// import ServerSelect from '../../../components/serverSelect'
// import ServiceSelect from '../../../components/serviceSelect'
//
// const FormItem = Form.Item
//
// class HigherChart extends Component {
//
//   static propTypes = {
//     shape: PropTypes.string.isRequired
//   }
//
//   constructor(props, ...others) {
//     super(props, ...others)
//     this.Chart = createG2(chart => {
//       this.chart = chart
//       chart.line().position('time*price').color('name').shape(props.shape).size(2)
//       chart.render()
//     })
//   }
//
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.shape !== this.props.shape) {
//       this.chart.clear()
//       this.chart.line().position('time*price').color('name').shape(nextProps.shape).size(2)
//       this.chart.render()
//     }
//   }
//
//   render() {
//     return (<this.Chart {...this.props} />)
//   }
// }
//
// class MyComponent extends Component {
//   state = {
//     shape: 'spline',
//     data: data.slice(0, data.length / 2 - 1),
//     width: 500,
//     height: 250,
//     plotCfg: {
//       margin: [10, 100, 50, 120]
//     }
//   }
//   changeHandler = () => {
//     this.setState({shape: 'line'})
//   }
//   render() {
//     return <div>
//       <HigherChart shape={this.state.shape} data={this.state.data} width={this.state.width} height={this.state.height} plotCfg={this.state.plotCfg} />
//       <button onClick={this.changeHandler}>Change shape</button>
//     </div>
//   }
// }
//
// const CollectionCreateForm = Form.create()((props) => {
//   const {visible, onCancel, onCreate, form} = props
//   const {getFieldDecorator} = form
//   return (
//     <Modal visible={visible} title='Create a new collection' okText='Create' onCancel={onCancel} onOk={onCreate}>
//       <Form layout='vertical'>
//         <FormItem label='Title'>
//           {getFieldDecorator('title', {
//             rules: [
//               {
//                 required: true,
//                 message: 'Please input the title of collection!'
//               }
//             ]
//           })(<Input />)}
//         </FormItem>
//         <FormItem label='Description'>
//           {getFieldDecorator('description')(<Input type='textarea' />)}
//         </FormItem>
//         <FormItem className='collection-create-form_last-form-item'>
//           {getFieldDecorator('modifier', {initialValue: 'public'})(
//             <Radio.Group>
//               <Radio value='public'>Public</Radio>
//               <Radio value='private'>Private</Radio>
//             </Radio.Group>
//           )}
//         </FormItem>
//       </Form>
//     </Modal>
//   )
// })
//
// class CollectionsPage extends Component {
//   state = {
//     visible: false
//   }
//   success = () => {
//     message.success('This is a message of success')
//   }
//   showModal = () => {
//     this.setState({visible: true})
//   }
//   handleCancel = () => {
//     this.setState({visible: false})
//   }
//   handleCreate = () => {
//     const form = this.form
//     form.validateFields((err, values) => {
//       if (err) {
//         return
//       }
//
//       console.log('Received values of form: ', values)
//       this.success()
//       form.resetFields()
//       this.setState({visible: false})
//     })
//   }
//   saveFormRef = (form) => {
//     this.form = form
//   }
//   render() {
//     return (
//       <div>
//         <Button type='primary' onClick={this.showModal}>New Collection</Button>
//         <CollectionCreateForm ref={this.saveFormRef} visible={this.state.visible} onCancel={this.handleCancel} onCreate={this.handleCreate} />
//       </div>
//     )
//   }
// }

export default class HomeView extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }
  //
  // shouldComponentUpdate() {
  //   return true
  // }
  //
  // // componentDidMount() {
  // //   const props = this.props
  // // }
  //
  // handleSelect(data) {
  //   console.log(data)
  // }
  //
  // handleChange(data) {
  //   console.log(data)
  // }

  render() {
    // const props = this.props
    // let selects = {
    //   resolved: false
    // }
    // let options = []
    // if (props.login.resolved) {
    //   let {products, productServerMap} = props.login.admin.data
    //   // console.log(products, productServerMap)
    //   selects = {
    //     productData: products,
    //     serverData: productServerMap,
    //     resolved: true
    //   }
    //   options = props.login.admin.data.options
    // }

    return (
      <div className='HomeView'>
        <h4>欢迎!</h4>
        {/* <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
        <MyComponent />
        <ServerSelect datas={selects} handleSelect={this.handleSelect} />
        <ServiceSelect onChange={this.handleChange} data={options} />

        <Card style={{marginBottom: 6}}>
          <Editor />
        </Card>

        <Row gutter={16} style={{marginBottom: 6}}>
          <Col span='8'>
            <Card title='Card title'>Card content</Card>
          </Col>
          <Col span='8'>
            <Card title='Card title'>Card content</Card>
          </Col>
          <Col span='8'>
            <Card title='Card title'>Card content</Card>
          </Col>
        </Row>

        <Card style={{marginBottom: 6}}>
          <EditableTable />
        </Card>

        <CollectionsPage /> */}
      </div>
    )
  }
}

// class EditableTable extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       dataSource: [{
//         key: 0,
//         name: 'Edward King 0',
//         age: 32,
//         address: 'London, Park Lane no. 0'
//       }, {
//         key: 1,
//         name: 'Edward King 1',
//         age: 32,
//         address: 'London, Park Lane no. 1'
//       }],
//       count: 2,
//       editing: {},
//       visible: false
//     }
//
//     this.columns = [{
//       title: 'name',
//       dataIndex: 'name',
//       width: '30%'
//     }, {
//       title: 'age',
//       dataIndex: 'age'
//     }, {
//       title: 'address',
//       dataIndex: 'address'
//     }, {
//       title: 'operation',
//       dataIndex: 'operation',
//       render: (text, record, index) => {
//         return (
//           this.state.dataSource.length > 1 ?
//           (
//             <div>
//               <Popconfirm title='确定要删除吗?' onConfirm={() => this.onDelete(record.key)}>
//                 <a href='#'>Delete</a>
//               </Popconfirm>
//                |
//               <a href='#' onClick={(e) => this.onEdit(e, record)}>Edit</a>
//             </div>
//           ) : null
//         )
//       }
//     }]
//   }
//
//   showModal = () => {
//     this.setState({
//       visible: true
//     })
//   }
//   handleCancel = () => {
//     this.setState({
//       visible: false
//     })
//   }
//   onEdit = (e, record) => {
//     e.preventDefault()
//     this.showModal()
//     _.map(this.state.dataSource, (val, index) => {
//       if (val.key === record.key) {
//         this.setState({
//           editing: val
//         })
//       }
//     })
//   }
//   onDelete = (key) => {
//     const dataSource = [...this.state.dataSource]
//     dataSource.splice(_.findIndex(dataSource, function(o) { return o.key === key }), 1)
//     this.setState({ dataSource })
//   }
//   handleAdd = () => {
//     const { count, dataSource } = this.state
//     const newData = {
//       key: count,
//       name: `Edward King ${count}`,
//       age: 32,
//       address: `London, Park Lane no. ${count}`
//     }
//     this.setState({
//       // dataSource: [...dataSource, newData],
//       dataSource: [newData, ...dataSource],
//       count: count + 1
//     })
//   }
//   handleSubmit = (values) => {
//     // console.log('Received values of form: ', values)
//     const dataSource = [...this.state.dataSource]
//     _.map(dataSource, (val, index) => {
//       if (val.key === this.state.editing.key) {
//         val = Object.assign(val, values)
//       }
//     })
//     this.setState({
//       visible: false,
//       dataSource
//     })
//   }
//   render() {
//     const { dataSource } = this.state
//     const columns = this.columns
//     return (
//       <div>
//         <Button className='editable-add-btn' onClick={this.handleAdd}>Add</Button>
//         <Table bordered dataSource={dataSource} columns={columns} />
//         <Modal
//           width={500}
//           key={Math.random()}
//           title='编辑'
//           visible={this.state.visible}
//           footer={null}
//           onCancel={this.handleCancel}
//         >
//           <WrappedDemo editSubmit={this.handleSubmit} rowData={this.state.editing} />
//         </Modal>
//       </div>
//     )
//   }
// }
//
// class EditForm extends Component {
//
//   static propTypes = {
//     form: PropTypes.object.isRequired,
//     rowData: PropTypes.object.isRequired,
//     editSubmit: PropTypes.object.isRequired
//   }
//
//   handleSubmit = (e) => {
//     e.preventDefault()
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         this.props.editSubmit(values)
//       }
//     })
//   }
//   checkAddress = (rule, value, callback) => {
//     const form = this.props.form
//     if (value && value !== form.getFieldValue('name')) {
//       callback('Two passwords that you enter is inconsistent!')
//     } else {
//       callback()
//     }
//   }
//   render() {
//     const data = this.props.rowData
//     const {getFieldDecorator} = this.props.form
//     const formItemLayout = {
//       labelCol: { span: 6 },
//       wrapperCol: { span: 14 }
//     }
//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <FormItem {...formItemLayout} label='用户名'>
//           {getFieldDecorator('name', {
//             initialValue: data.name,
//             rules: [{ required: true, message: 'Please input your username!' }]
//           })(
//             <Input disabled />
//           )}
//         </FormItem>
//         <FormItem {...formItemLayout} label='年龄'>
//           {getFieldDecorator('age', {
//             initialValue: data.age,
//             rules: [{ required: true, message: 'Please input your Password!' }]
//           })(
//             <InputNumber min={0} max={150} />
//           )}
//         </FormItem>
//         <FormItem {...formItemLayout} label='地址'>
//           {getFieldDecorator('address', {
//             initialValue: data.address,
//             rules: [{ required: true, message: 'Please input your username!' }, { validator: this.checkAddress }]
//           })(
//             <Input type='textarea' autosize={{ minRows: 3, maxRows: 6 }} />
//           )}
//         </FormItem>
//         <FormItem wrapperCol={{ span: 12, offset: 6 }}>
//           <Button type='primary' htmlType='submit' >修改提交</Button>
//         </FormItem>
//       </Form>
//     )
//   }
// }
//
// const WrappedDemo = Form.create()(EditForm)


// export const HomeView = () => (
//   <div className='HomeView'>
//     <h4>Welcome!</h4>
//     <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
//   </div>
// )
//
// export default HomeView
