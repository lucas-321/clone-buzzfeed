import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = finalAnswer

      console.log(this.answers)
    }
  }

  async checkResult(answers:string[]){

    interface Temperamento {
      nome: string;
      contador: number;
    }

    const temperamentos: { [key: string]: Temperamento } = {
      S: { nome: 'Sanguíneo', contador: 0 },
      C: { nome: 'Colérico', contador: 0 },
      M: { nome: 'Melancólico', contador: 0 },
      F: { nome: 'Fleumático', contador: 0 },
    };

    for (let i = 0; i < answers.length; i++) {
      const resposta = answers[i];
      if (temperamentos[resposta]) {
        temperamentos[resposta].contador++;
      }
    }

    let resultado: string[] = Object.values(temperamentos)
      .filter((temperamento) => temperamento.contador >= 2)
      .map((temperamento) => temperamento.nome);

    let resultadoMensagem: string;
    if (resultado.length > 1) {
      const ultimo = resultado.pop();
      resultadoMensagem = `O seu temperamento é ${resultado.join(', ')} e ${ultimo}.`;
    } else if (resultado.length === 1) {
      resultadoMensagem = `O seu temperamento é ${resultado[0]}.`;
    } else {
      resultadoMensagem = 'Não foi possível determinar o temperamento.';
    }

    console.log(resultadoMensagem);
    console.log("O array é " + answers);

    return resultadoMensagem;

  }

}
