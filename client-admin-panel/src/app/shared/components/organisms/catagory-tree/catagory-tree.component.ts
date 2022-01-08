import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catagory-tree',
  templateUrl: './catagory-tree.component.html',
})
export class CatagoryTreeComponent implements OnInit {
  testJson = [
    {
      name: 'first Nme',
      sub: [
        {
          name: 'testValueValue1',
          sub: null,
        },
      ],
    },
    {
      name: 'second Nme',
      sub: [
        {
          name: 'first Nme',
          sub: [
            {
              name: 'testValueValue2',
              sub: null,
            },
          ],
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit() {}
}
