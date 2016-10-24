describe('Create a Skip Plan', function() {
  it('Client List page', function() {

   browser.get('https://qa-investmentplanner.financialexpress.net/'); 
    
    element(by.model('groupName')).sendKeys('sp26 test');
    element(by.model('userName')).sendKeys('test1');
    element(by.model('password')).sendKeys('fedby123');
    element(by.css('[class="btn-text"]')).click()

    var todoList = element.all(by.repeater('row in clients'));
    expect(todoList.count()).toEqual(10);
    
  });

  it('Select a client and select a plan', function() {

    element(by.xpath('//table//td[.="New"]/following-sibling::td[.="Client"]')).click();
       
    var clientTitle = element(by.xpath("//h1/span[.='New Client'][@class='ng-binding']"));
    expect(clientTitle.isPresent()).toBe(true);

    element(by.buttonText("Start Plan")).click();

    var eValueSkip = element(by.buttonText("Skip Questionnaire & Manually Set Risk Level"));
    expect(eValueSkip.isPresent()).toBe(true);
    
  });
  it(' Creating a skip plan', function() {
      element(by.buttonText("Skip Questionnaire & Manually Set Risk Level")).click();
      element(by.xpath("//select[@name='term']")).click();
      element(by.xpath("//select[@name='term']/option[2]")).click();
      element(by.xpath("//select[@name='riskLevel']")).click();
      element(by.xpath("//select[@name='riskLevel']/option[5]")).click();
      element(by.model('requestData.riskLevelNotes')).sendKeys('test');
      element(by.buttonText("Save")).click();
      element(by.model('requestData.workflowName')).sendKeys('test plan'); 
      element(by.xpath("//div[contains(@class,'modal-dialog')]//button[normalize-space(.)='Save']")).click();
      var summaryTitle = element(by.xpath('//h1[.="Summary"]'));
      expect(summaryTitle.isPresent()).toBe(true);
      element(by.buttonText("Exit Plan")).click();
  });
  it('Validating the created plan', function() {
      var createdPlanName = element(by.xpath("//td[.='test plan']"));
      expect(createdPlanName.isPresent()).toBe(true);
  });
  it('Logout the IP', function() {
      element(by.xpath("//a[@title='Logout']")).click();
      var groupName = element(by.model('groupName'));
      expect(groupName.isPresent()).toBe(true);
  });
});