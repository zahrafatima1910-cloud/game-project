function drawCharacter() {
  if (isLeft && isFalling) {
    // add your jumping-left code

    fill("#023846ff");
    ellipse(character.x - 14, character.y - 65, 15, 15); //earone
    ellipse(character.x + 14, character.y - 65, 15, 15); //ear two
    push();
    translate(character.x + 16, character.y - 26);
    rotate(radians(-65)); // tilt right hand
    ellipse(0, 0, 10, 30);
    pop();
    push();
    translate(character.x - 12, character.y - 26); // move pivot
    rotate(radians(65)); // tilt left hand
    ellipse(0, 0, 10, 30);
    pop();
    push();

    translate(character.x - 10, character.y);
    rotate(radians(30)); // front leg
    ellipse(0, 0, 8, 18);
    pop();
    fill("#caecfaff");
    ellipse(character.x - 13, character.y + 6, 8, 6); //legs
    push();
    fill("#023846ff");
    translate(character.x + 8, character.y);
    rotate(radians(-65)); // back leg
    ellipse(0, 0, 8, 18);
    pop();
    fill("#caecfaff");
    ellipse(character.x + 13, character.y + 3, 8, 6); //legs
    ellipse(character.x, character.y - 20, 30, 35); //body
    fill("#caecfaff");
    ellipse(character.x, character.y - 50, 35, 30); //face
    fill(0);
    ellipse(character.x - 12, character.y - 55, 4, 4); //eyes
    ellipse(character.x, character.y - 55, 4, 4);

    fill(255);
    fill("#caecfaff");
    fill("#F9687C");
    arc(character.x - 5, character.y - 45, 10, 10, 0, PI); //lips
    push();
  } else if (isRight && isFalling) {
    fill("#023846ff");
    ellipse(character.x - 14, character.y - 65, 15, 15); //earone
    ellipse(character.x + 14, character.y - 65, 15, 15); //ear two
    push();
    translate(character.x + 12, character.y - 26);
    rotate(radians(-65)); // tilt right hand
    ellipse(0, 0, 10, 30);
    pop();
    push();
    translate(character.x - 16, character.y - 26); // move pivot
    rotate(radians(65)); // tilt left hand
    ellipse(0, 0, 10, 30);
    pop();
    push();

    translate(character.x - 11, character.y - 3);
    rotate(radians(70)); // front leg
    ellipse(0, 0, 8, 18);
    pop();
    fill("#caecfaff");
    ellipse(character.x - 18, character.y, 8, 6); //legs
    push();
    fill("#023846ff");
    translate(character.x + 6, character.y + 2);
    rotate(radians(-30)); // back leg
    ellipse(0, 0, 8, 18);
    pop();
    fill("#caecfaff");
    ellipse(character.x + 9, character.y + 7, 8, 6); //legs
    ellipse(character.x, character.y - 20, 30, 35); //body
    fill("#caecfaff");
    ellipse(character.x, character.y - 50, 35, 30); //face
    fill(0);
    ellipse(character.x + 12, character.y - 55, 4, 4); //eyes
    ellipse(character.x, character.y - 55, 4, 4);

    fill(255);
    fill("#F9687C");
    arc(character.x + 5, character.y - 45, 10, 10, 0, PI);
  } else if (isRight) {
    // add your walking right code

    fill("#023846ff");
    ellipse(character.x - 14, character.y - 65, 15, 15); //earone
    ellipse(character.x + 14, character.y - 65, 15, 15); //ear two
    push();
    translate(character.x + 12, character.y - 26);
    rotate(radians(-45)); // tilt right hand
    ellipse(0, 0, 10, 30);
    pop();
    push();
    translate(character.x - 16, character.y - 24); // move pivot
    rotate(radians(45)); // tilt left hand
    ellipse(0, 0, 10, 30);
    pop();
    legMove = sin(frameCount * 0.2) * 30;
    push();
    translate(character.x - 6, character.y);
    rotate(radians(legMove));
    fill("#023846ff");
    ellipse(0, 0, 8, 18);
    pop();

    fill("#caecfaff");
    ellipse(character.x - 6, character.y + 8, 8, 6);
    push();
    translate(character.x + 6, character.y);
    rotate(radians(-legMove));
    fill("#023846ff");
    ellipse(0, 0, 8, 18);
    pop();

    fill("#caecfaff");
    ellipse(character.x + 6, character.y + 8, 8, 6);
    ellipse(character.x, character.y - 20, 30, 35); //body
    fill("#caecfaff");
    ellipse(character.x, character.y - 50, 35, 30); //face
    fill(0);
    ellipse(character.x, character.y - 55, 4, 4); //eyes
    ellipse(character.x + 12, character.y - 55, 4, 4);

    fill(255);
    fill("#caecfaff");
    fill("#F9687C");
    arc(character.x + 5, character.y - 45, 10, 10, 0, PI);
  } else if (isLeft) {
    fill("#023846ff");
    ellipse(character.x - 14, character.y - 65, 15, 15); //earone
    ellipse(character.x + 14, character.y - 65, 15, 15); //ear two
    push();
    translate(character.x + 16, character.y - 26);
    rotate(radians(-45)); // tilt right hand
    ellipse(0, 0, 10, 30);
    pop();
    push();
    translate(character.x - 12, character.y - 26); // move pivot
    rotate(radians(45)); // tilt left hand
    ellipse(0, 0, 10, 30);
    pop();

    push();

    translate(character.x - 10, character.y);
    rotate(radians(30)); // front leg
    ellipse(0, 0, 8, 18);
    pop();
    fill("#caecfaff");
    ellipse(character.x - 13, character.y + 6, 8, 6); //legs
    push();
    fill("#023846ff");
    translate(character.x + 8, character.y);
    rotate(radians(-65)); // back leg
    ellipse(0, 0, 8, 18);
    pop();
    fill("#caecfaff");
    ellipse(character.x + 13, character.y + 3, 8, 6); //legs

    ellipse(character.x, character.y - 20, 30, 35); //body
    fill("#caecfaff");
    ellipse(character.x, character.y - 50, 35, 30); //face
    fill(0);
    ellipse(character.x - 12, character.y - 55, 4, 4); //eyes
    ellipse(character.x, character.y - 55, 4, 4);

    fill(255);

    fill("#F9687C");
    arc(character.x - 5, character.y - 45, 10, 10, 0, PI); //lips
  } else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code

    fill("#023846ff");
    ellipse(character.x - 14, character.y - 65, 15, 15); //earone
    ellipse(character.x + 14, character.y - 65, 15, 15); //ear two
    push();
    translate(character.x + 14, character.y - 26);
    rotate(radians(-70)); // tilt right hand
    ellipse(0, 0, 10, 30);
    pop();
    push();
    translate(character.x - 14, character.y - 26); // move pivot
    rotate(radians(70)); // tilt left hand
    ellipse(0, 0, 10, 30);
    pop();
    push();

    translate(character.x - 6, character.y);
    rotate(radians(0)); // front leg
    ellipse(0, 0, 8, 14);
    pop();
    fill("#caecfaff");
    ellipse(character.x - 6, character.y + 5, 8, 6); //legs
    push();
    fill("#023846ff");
    translate(character.x + 6, character.y);
    rotate(radians(0)); // back leg
    ellipse(0, 0, 8, 14);
    pop();
    fill("#caecfaff");
    ellipse(character.x + 6, character.y + 5, 8, 6); //legs
    ellipse(character.x, character.y - 20, 30, 35); //body
    fill("#caecfaff");
    ellipse(character.x, character.y - 50, 35, 30); //face
    fill(0);
    ellipse(character.x - 7, character.y - 55, 4, 4); //eyes
    ellipse(character.x + 7, character.y - 55, 4, 4);

    fill(255);
    fill("#F9687C");
    arc(character.x, character.y - 45, 10, 10, 0, PI);
  } else {
    // add your standing front facing code

    fill("#023846ff");
    ellipse(character.x - 14, character.y - 65, 15, 15); //earone
    ellipse(character.x + 14, character.y - 65, 15, 15); //ear two
    push();
    translate(character.x + 14, character.y - 26);
    rotate(radians(-45)); // tilt right hand
    ellipse(0, 0, 10, 30);
    pop();
    push();
    translate(character.x - 14, character.y - 26); // move pivot
    rotate(radians(45)); // tilt left hand
    ellipse(0, 0, 10, 30);
    pop();
    push();

    translate(character.x - 6, character.y);
    rotate(radians(0)); // front leg
    ellipse(0, 0, 8, 18);
    pop();
    fill("#caecfaff");
    ellipse(character.x - 6, character.y + 8, 8, 6); //legs
    push();
    fill("#023846ff");
    translate(character.x + 6, character.y);
    rotate(radians(0)); // back leg
    ellipse(0, 0, 8, 18);
    pop();
    fill("#caecfaff");
    ellipse(character.x + 6, character.y + 8, 8, 6); //legs

    ellipse(character.x, character.y - 20, 30, 35); //body
    fill("#caecfaff");
    ellipse(character.x, character.y - 50, 35, 30); //face
    fill(0);
    ellipse(character.x - 7, character.y - 55, 4, 4); //eyes
    ellipse(character.x + 7, character.y - 55, 4, 4);

    fill("#caecfaff");
    fill("#F9687C");
    arc(character.x, character.y - 45, 10, 10, 0, PI);
  }
}