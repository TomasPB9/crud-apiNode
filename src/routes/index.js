const express = require('express');
const router=express.Router();

const Task=require('../models/task');

router.get('/',async(req,res)=>{
  const tasks=await Task.find();
  console.log(tasks);
  res.render('index',{
    tasks  //is the same=>    tasks:tasks
  });
});

router.post('/add', async(req,res)=>{
  console.log(new Task(req.body));
  const task=new Task(req.body);
  await task.save();
  res.redirect('/');
});

router.get('/update/:id', async(req,res)=>{
  const {id}=req.params;
  const task=await Task.findById(id);
  task.status=!task.status;
  await task.save();
  res.redirect('/');
});

router.get('/edit/:id', async(req,res)=>{
  const { id } = req.params;
  const task = await Task.findById(id);
  res.render('edit',{
    task
  });
});

router.post('/edit/:id', async(req,res)=>{
  const { id } = req.params;
  await Task.update({_id:id},req.body);
  res.redirect('/');
});

router.get('/delete/:id', async(req,res)=>{
  const {id}=req.params;
  await Task.remove({_id:id});
  res.redirect('/');
});

module.exports=router;